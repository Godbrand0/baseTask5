"use client";

import { useEffect } from "react";
import sdk from "@farcaster/miniapp-sdk";

interface MiniAppWrapperProps {
  children: React.ReactNode;
}

export function MiniAppWrapper({ children }: MiniAppWrapperProps) {
  useEffect(() => {
    // Check if we're in a Farcaster context
    const isFarcasterContext = typeof window !== 'undefined' &&
      (window.location.href.includes('farcaster') ||
       document.referrer.includes('farcaster') ||
       window.parent !== window);

    if (isFarcasterContext) {
      console.log('[Farcaster] Initializing mini app SDK...');

      try {
        // Initialize the SDK context
        sdk.context.then((context) => {
          console.log('[Farcaster] Context loaded:', context);
        }).catch((error) => {
          console.error('[Farcaster] Error loading context:', error);
        });

        // Signal that the app is ready to be displayed
        sdk.actions.ready();
        console.log('[Farcaster] App ready signal sent');
      } catch (error) {
        console.error('[Farcaster] Error initializing SDK:', error);
      }
    } else {
      console.log('[Farcaster] Not in Farcaster context, skipping SDK initialization');
    }
  }, []);

  return <>{children}</>;
}