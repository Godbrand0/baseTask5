import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl ="https://base-sepolia-rpc.publicnode.com";
  
  const manifest = {
    accountAssociation: {
      header: "",
      payload: "",
      signature: ""
    },
    baseBuilder: {
      allowedAddresses: [""] // Will be updated with your Base Account address
    },
    miniapp: {
      version: "1",
      name: "Todo List Mini App",
      homeUrl: `${baseUrl}`,
      iconUrl: `${baseUrl}/icon.png`,
      splashImageUrl: `${baseUrl}/splash.png`,
      splashBackgroundColor: "#000000",
      webhookUrl: `${baseUrl}/api/webhook`,
      subtitle: "Manage tasks on-chain",
      description: "A todo list application built on Base Sepolia. Create, assign users, manage, and track your tasks with the power of base.",
      screenshotUrls: [
        `${baseUrl}/screenshots/1.png`,
        `${baseUrl}/screenshots/2.png`,
        `${baseUrl}/screenshots/3.png`
      ],
      primaryCategory: "productivity",
      tags: ["todo", "tasks", "blockchain", "base", "productivity"],
      heroImageUrl: `${baseUrl}/hero.png`,
      tagline: "Task management on Base",
      ogTitle: "Todo List Mini App",
      ogDescription: "A decentralized todo list application built on Base Sepolia. Manage your tasks on-chain.",
      ogImageUrl: `${baseUrl}/og.png`,
      noindex: false
    }
  };

  return Response.json(manifest);
}