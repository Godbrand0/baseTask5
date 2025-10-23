"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "@/providers/WagmiProvider";
import { Web3Provider } from "@/contexts/Web3Context";
import { ReactNode, useState } from "react";

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider>
        <Web3Provider>
          {children}
        </Web3Provider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}