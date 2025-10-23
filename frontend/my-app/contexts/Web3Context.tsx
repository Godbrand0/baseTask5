"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";

// Create a function to get the config to avoid passing non-serializable objects
function getWagmiConfig() {
  return createConfig({
    chains: [baseSepolia],
    connectors: [metaMask()],
    transports: {
      [baseSepolia.id]: http(),
    },
  });
}


interface Web3ContextType {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
  disconnect: () => void;
  switchChain: () => void;
  isCorrectChain: boolean;
  error: Error | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
}

interface Web3ProviderProps {
  children: ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, isPending: isConnectPending, error: connectError } = useConnect();
  const { disconnect, error: disconnectError } = useDisconnect();
  const { switchChain, isPending: isSwitchPending } = useSwitchChain();
  const chainId = useChainId();

  const [error, setError] = useState<Error | null>(null);

  const isCorrectChain = chainId === baseSepolia.id;

  const handleConnect = () => {
    setError(null);
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  const handleDisconnect = () => {
    setError(null);
    disconnect();
  };

  const handleSwitchChain = () => {
    setError(null);
    switchChain({ chainId: baseSepolia.id });
  };

  useEffect(() => {
    if (connectError) {
      setError(connectError);
    } else if (disconnectError) {
      setError(disconnectError);
    }
  }, [connectError, disconnectError]);

  const value: Web3ContextType = {
    address,
    isConnected,
    isConnecting: isConnecting || isConnectPending || isSwitchPending,
    connect: handleConnect,
    disconnect: handleDisconnect,
    switchChain: handleSwitchChain,
    isCorrectChain,
    error,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}

// Export the function instead of the config object
export { getWagmiConfig };
