"use client";

import { WagmiProvider as WagmiProviderComponent } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getWagmiConfig } from "@/contexts/Web3Context";
import { ReactNode } from "react";

// Create a new query client instance
const queryClient = new QueryClient();

interface WagmiProviderProps {
  children: ReactNode;
}

export function WagmiProvider({ children }: WagmiProviderProps) {
  const config = getWagmiConfig();
  return (
    <WagmiProviderComponent config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProviderComponent>
  );
}