import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = "https://base-task5-dvgq.vercel.app/";
  
  const manifest = {
      "accountAssociation": {
    "header": "eyJmaWQiOjk3NDcxNCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDk5NTU5OGM3Mjg1YkY4MDRFNzAwMzVkOEQxMkM4ZDY4NzM2NDcwQjAifQ",
    "payload": "eyJkb21haW4iOiJiYXNlLXRhc2s1LWR2Z3EudmVyY2VsLmFwcCJ9",
    "signature": "kl6HgA0FQYsRdN3xK+EM99jUhCDa4/SPn4cp1uu97Qx0wbQAIKd8oQjuH1V4C8KxWiv3LebURD0wyXKdeGsQfBw="
  },

    
    miniapp: {
      version: "1",
      name: "Todo List Mini App",
      homeUrl: `${baseUrl}`,
      iconUrl: "https://postimg.cc/wRp7c7fr",
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