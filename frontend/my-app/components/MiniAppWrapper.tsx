"use client";

import { useEffect } from "react";

interface MiniAppWrapperProps {
  children: React.ReactNode;
}

export function MiniAppWrapper({ children }: MiniAppWrapperProps) {
  useEffect(() => {
    // Import the SDK dynamically to avoid SSR issues
    import("@farcaster/miniapp-sdk").then((module) => {
      // Once app is ready to be displayed
      const sdk = module.default || module;
      if (sdk && sdk.actions) {
        sdk.actions.ready();
      }
    });
  }, []);

  return <>{children}</>;
}