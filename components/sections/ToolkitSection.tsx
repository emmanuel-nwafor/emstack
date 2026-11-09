"use client";

import React from "react";
import { ToolkitSectionProps } from "@/constants";
import { Icon } from "@iconify/react";

interface ToolMeta {
  icon: string;
}

const TOOL_META: Record<string, ToolMeta> = {
  "Python 3.12": { icon: "logos:python" },
  Python: { icon: "logos:python" },
  TypeScript: { icon: "logos:typescript-icon" },
  JavaScript: { icon: "logos:javascript" },
  SQL: { icon: "simple-icons:postgresql" },
  PHP: { icon: "logos:php" },
  LangGraph: { icon: "simple-icons:langchain" },
  LangChain: { icon: "simple-icons:langchain" },
  "FastMCP Protocol": { icon: "solar:bolt-bold-duotone" },
  "Claude 3.7": { icon: "simple-icons:anthropic" },
  "OpenAI Responses API": { icon: "logos:openai-icon" },
  "Google Gemini": { icon: "logos:google-gemini" },
  "xAI Grok": { icon: "simple-icons:x" },
  "n8n Automation": { icon: "simple-icons:n8n" },
  Zapier: { icon: "logos:zapier-icon" },
  Webhooks: { icon: "solar:tuning-bold-duotone" },
  Docker: { icon: "logos:docker-icon" },
  "Redis Queues": { icon: "logos:redis" },
  ChromaDB: { icon: "solar:database-bold-duotone" },
  "Hybrid RAG": { icon: "solar:magnifer-bold-duotone" },
  "Dense Embeddings": { icon: "solar:layers-bold-duotone" },
  "Semantic Rerankers": { icon: "solar:sort-by-alphabet-bold-duotone" },
  "Next.js 16": { icon: "logos:nextjs-icon" },
  "Next.js": { icon: "logos:nextjs-icon" },
  "React 19": { icon: "logos:react" },
  "React.js": { icon: "logos:react" },
  "React Native": { icon: "logos:react" },
  Vue: { icon: "logos:vue" },
  Zustand: { icon: "twemoji:bear" },
  Redux: { icon: "logos:redux" },
  "Tailwind CSS": { icon: "logos:tailwindcss-icon" },
  Expo: { icon: "simple-icons:expo" },
  TanStack: { icon: "simple-icons:tanstack" },
  "Node.js": { icon: "logos:nodejs-icon" },
  "Express.js": { icon: "simple-icons:express" },
  Redis: { icon: "logos:redis" },
  BullMQ: { icon: "twemoji:ox" },
  "Socket.io": { icon: "logos:socket-io" },
  PostgreSQL: { icon: "logos:postgresql" },
  MongoDB: { icon: "logos:mongodb-icon" },
  MySQL: { icon: "logos:mysql-icon" },
  Supabase: { icon: "logos:supabase-icon" },
  Prisma: { icon: "logos:prisma" },
  TypeORM: { icon: "simple-icons:typeorm" },
  "HubSpot CRM": { icon: "logos:hubspot" },
  Notion: { icon: "logos:notion-icon" },
  "Slack API": { icon: "logos:slack-icon" },
  Airtable: { icon: "logos:airtable" },
  "Google Workspace": { icon: "logos:google-icon" },
  "WhatsApp Business API": { icon: "logos:whatsapp-icon" },
  "...and more": { icon: "solar:menu-dots-bold-duotone" },
  Git: { icon: "logos:git-icon" },
  "Git CLI": { icon: "logos:git-icon" },
  Jest: { icon: "logos:jest" },
  cPanel: { icon: "logos:cpanel" },
  "SMTP routing": { icon: "solar:letter-bold-duotone" },
  "DNS/SSL setup": { icon: "solar:shield-check-bold-duotone" },
  WebSockets: { icon: "solar:socket-bold-duotone" },
};

function ToolChip({ item }: { item: string }) {
  const meta = TOOL_META[item] || {
    icon: "solar:widget-bold-duotone",
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white transition-all duration-200 cursor-default">
      <Icon icon={meta.icon} className="h-4 w-4 shrink-0" />
      <span className="text-xs sm:text-sm font-medium">{item}</span>
    </div>
  );
}

export default function ToolkitSection({ toolkit }: ToolkitSectionProps) {
  return (
    <section
      id="toolkit"
      className="relative z-10 py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/10 select-none"
    >
      <header className="mb-14">
        <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest">
          05 — Skills &amp; Tools
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mt-2">
          The toolkit,{" "}
          <em className="font-serif italic font-normal text-purple-300">
            kept sharp
          </em>
        </h2>
      </header>

      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl divide-y divide-white/[0.08] overflow-hidden">
        {toolkit.map((cat) => (
          <div
            key={cat.title}
            className="px-6 sm:px-10 py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12"
          >
            <span className="w-28 sm:w-40 shrink-0 text-xs font-mono font-semibold text-neutral-400 uppercase tracking-widest">
              {cat.title}
            </span>
            <div className="flex flex-wrap gap-2.5 items-center">
              {cat.items.map((item) => (
                <ToolChip key={item} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
