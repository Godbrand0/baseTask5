"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWeb3 } from "@/contexts/Web3Context";
import { OnchainWallet } from "@/components/OnchainWallet";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

export default function LandingPage() {
  const router = useRouter();
  const { isConnected, isCorrectChain } = useWeb3();

  useEffect(() => {
    // Redirect to main app if connected and on correct chain
    if (isConnected && isCorrectChain) {
      router.push("/app");
    }
  }, [isConnected, isCorrectChain, router]);

  if (isConnected && isCorrectChain) {
    // Show loading while redirecting
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Redirecting...</CardTitle>
            <CardDescription>Taking you to the app</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-foreground">Todo List dApp</h1>
        </div>
        <OnchainWallet />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Manage Your Tasks
              <span className="block text-primary">On the Blockchain</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple todo list application built on Base Sepolia. Create,assign, manage, and track your tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <div className="w-full sm:w-auto">
                <OnchainWallet />
              </div>
              <Link href="/app">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  Secure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your tasks are stored securely on the blockchain, giving you full control and ownership of your data.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  Collaborative
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Assign tasks to team members and track progress together in a transparent, decentralized environment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Fast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built on Base Sepolia for fast, low-cost transactions. Manage your tasks efficiently without high gas fees.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center border-t border-border bg-card">
        <p className="text-sm text-muted-foreground">
          Powered by <span className="text-primary font-semibold">Base</span> and <span className="text-primary font-semibold">OnchainKit</span>
        </p>
      </footer>
    </div>
  );
}