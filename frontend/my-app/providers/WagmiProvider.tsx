"use client";

import { WagmiProvider as WagmiProviderComponent } from "wagmi";
import { getWagmiConfig } from "@/contexts/Web3Context";
import { ReactNode } from "react";

interface WagmiProviderProps {
  children: ReactNode;
}

export function WagmiProvider({ children }: WagmiProviderProps) {
  const config = getWagmiConfig();
  return <WagmiProviderComponent config={config}>{children}</WagmiProviderComponent>;
}