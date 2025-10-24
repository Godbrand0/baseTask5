"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Wallet, WalletDropdown, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";
import { useWallet } from "@/hooks/useWallet";
import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/Button";
import { formatAddress } from "@/lib/utils";

export function OnchainWallet() {
  const router = useRouter();
  const { address, isConnected, isCorrectNetwork, switchToBaseSepolia } = useWallet();
  const { disconnect } = useWeb3();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (isConnected && !isCorrectNetwork) {
    return (
      <div className="flex flex-col sm:flex-row items-end gap-2">
        <div className="network-status wrong">
          <div className="w-2 h-2 bg-error rounded-full"></div>
          Wrong Network
        </div>
        <Button
          onClick={switchToBaseSepolia}
          size="sm"
          className="bg-warning hover:bg-warning/90 text-warning-foreground shadow-md"
        >
          Switch to Base Sepolia
        </Button>
      </div>
    );
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isConnected && isCorrectNetwork) {
    const handleDisconnect = () => {
      disconnect();
      router.push("/landing");
    };

    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <div className="network-status">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            Base Sepolia
          </div>
          <div className="wallet-address dropdown-container relative" ref={dropdownRef}>
            <span
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {formatAddress(address || "")}
            </span>
            <div className={`dropdown-menu absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 transition-all duration-200 ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <div className="px-3 py-2 border-b border-border">
                <div className="text-sm font-medium text-foreground">Wallet</div>
                <div className="wallet-address mt-1">{formatAddress(address || "")}</div>
              </div>
              <button
                onClick={handleDisconnect}
                className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Disconnect Wallet
              </button>
            </div>
          </div>
        </div>
        <div className="wallet-container">
          <Wallet>
            <WalletDropdown className="wallet-dropdown">
              <div className="px-3 py-2 border-b border-border">
                <div className="text-sm font-medium text-foreground">Wallet</div>
                <div className="wallet-address mt-1">{formatAddress(address || "")}</div>
              </div>
              <button
                onClick={handleDisconnect}
                className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Disconnect Wallet
              </button>
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-container">
      <Wallet />
    </div>
  );
}
