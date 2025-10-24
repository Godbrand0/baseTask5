import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = "https://base-task5-dvgq.vercel.app/";
  
  const manifest = {
    accountAssociation: {
      header: "",
      payload: "",
      signature: ""
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
      description: "A simple todo list application built on Base. Create, assign users, manage, and track your tasks with the power of base.",
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
      ogDescription: "A todo list application built on Base. Manage your tasks on-chain.",
      ogImageUrl: `${baseUrl}/og.png`,
      noindex: false
    }
  };

  return Response.json(manifest);
}