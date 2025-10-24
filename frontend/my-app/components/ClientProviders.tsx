"use client";

import { WagmiProvider } from "@/providers/WagmiProvider";
import { OnchainKitProviderWrapper } from "@/providers/OnchainKitProvider";
import { Web3Provider } from "@/contexts/Web3Context";
import { MiniAppWrapper } from "@/components/MiniAppWrapper";
import { ReactNode } from "react";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <MiniAppWrapper>
      <WagmiProvider>
        <OnchainKitProviderWrapper>
          <Web3Provider>
            {children}
          </Web3Provider>
        </OnchainKitProviderWrapper>
      </WagmiProvider>
    </MiniAppWrapper>
  );
}