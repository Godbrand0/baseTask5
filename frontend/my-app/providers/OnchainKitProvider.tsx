"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { baseSepolia } from "wagmi/chains";
import { ReactNode } from "react";

interface OnchainKitProviderProps {
  children: ReactNode;
}

export function OnchainKitProviderWrapper({ children }: OnchainKitProviderProps) {
  return (
    <OnchainKitProvider
      chain={baseSepolia}
    >
      {children}
    </OnchainKitProvider>
  );
}