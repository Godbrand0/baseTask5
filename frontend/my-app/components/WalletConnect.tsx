"use client";

import { useWeb3 } from "@/contexts/Web3Context";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatAddress } from "@/lib/utils";

export function WalletConnect() {
  const {
    address,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    switchChain,
    isCorrectChain,
    error
  } = useWeb3();

  if (isConnected && isCorrectChain) {
    return (
      <Card className="w-full max-w-md border-border shadow-sm">
        <CardHeader className="border-b border-border bg-card">
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="w-10 h-10 bg-success rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-lg">Connected</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Connected to Base Sepolia
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="bg-muted rounded-xl p-4 border border-border">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Wallet Address</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-medium text-foreground">
                    {formatAddress(address || "")}
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={disconnect}
              variant="outline"
              className="w-full border-border text-destructive hover:bg-destructive/10 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isConnected && !isCorrectChain) {
    return (
      <Card className="w-full max-w-md border-error shadow-sm">
        <CardHeader className="border-b border-error/20 bg-error/5">
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="w-10 h-10 bg-error rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-error-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-lg">Wrong Network</span>
          </CardTitle>
          <CardDescription className="text-error">
            Please switch to Base Sepolia
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="bg-muted rounded-xl p-4 border border-border">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Wallet Address</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-medium text-foreground">
                    {formatAddress(address || "")}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={switchChain}
                loading={isConnecting}
                className="w-full bg-warning hover:bg-warning/90 text-warning-foreground shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Switch Network
              </Button>
              <Button
                onClick={disconnect}
                variant="outline"
                className="w-full border-border text-destructive hover:bg-destructive/10 transition-colors"
              >
                Disconnect
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-border shadow-sm">
      <CardHeader className="border-b border-border bg-card">
        <CardTitle className="flex items-center gap-3 text-foreground">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <span className="text-lg">Connect Wallet</span>
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Connect to start managing your todos
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {error && (
            <div className="rounded-xl bg-error/5 border border-error/20 p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-error mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-error">Connection Error</p>
                  <p className="text-sm text-error/80 mt-1">
                    {error.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-muted rounded-xl p-4 border border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Coinbase Wallet Required</p>
                <p className="text-xs text-muted-foreground mt-1">Connect using Coinbase Wallet to manage your todos</p>
              </div>
            </div>
          </div>

          <Button
            onClick={connect}
            loading={isConnecting}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm text-base font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            {isConnecting ? "Connecting..." : "Connect Coinbase Wallet"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
