"use client";

import React, { useState, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";

interface NodePos {
  x: number;
  y: number;
}

interface WorkflowNodeDef {
  id: string;
  label: string;
  subLabel?: string;
  icon: string;
  category: "trigger" | "agent" | "model" | "tool" | "action";
  accent?: string;
  initialPos: NodePos;
}

const DEFAULT_NODES: WorkflowNodeDef[] = [
  {
    id: "trigger",
    label: "New WhatsApp message",
    subLabel: "Webhook trigger",
    icon: "logos:whatsapp-icon",
    category: "trigger",
    accent: "#10b981",
    initialPos: { x: 40, y: 70 },
  },
  {
    id: "agent",
    label: "Qualify and answer the lead",
    subLabel: "Autonomous Agent Router",
    icon: "solar:magic-stick-3-bold-duotone",
    category: "agent",
    accent: "#a855f7",
    initialPos: { x: 260, y: 55 },
  },
  {
    id: "reply",
    label: "Reply on whatsapp",
    subLabel: "Message: send",
    icon: "logos:whatsapp-icon",
    category: "action",
    accent: "#10b981",
    initialPos: { x: 670, y: 65 },
  },
  {
    id: "claude",
    label: "Claude Sonnet 3.7",
    subLabel: "Chat Model",
    icon: "simple-icons:anthropic",
    category: "model",
    initialPos: { x: 40, y: 280 },
  },
  {
    id: "memory",
    label: "Remember conversation",
    subLabel: "Window buffer",
    icon: "solar:database-bold-duotone",
    category: "tool",
    initialPos: { x: 195, y: 280 },
  },
  {
    id: "notion",
    label: "Read FAQ & Pricing",
    subLabel: "search: page",
    icon: "logos:notion-icon",
    category: "tool",
    initialPos: { x: 350, y: 280 },
  },
  {
    id: "calendar",
    label: "Book a demo call",
    subLabel: "create: event",
    icon: "logos:google-calendar",
    category: "tool",
    initialPos: { x: 510, y: 280 },
  },
  {
    id: "slack",
    label: "Hand off to sales rep",
    subLabel: "post: message",
    icon: "logos:slack-icon",
    category: "tool",
    initialPos: { x: 670, y: 280 },
  },
  {
    id: "hubspot",
    label: "Update lead in HubSpot",
    subLabel: "upsert: contact",
    icon: "logos:hubspot",
    category: "tool",
    initialPos: { x: 830, y: 280 },
  },
];

const AVAILABLE_CATALOG: {
  id: string;
  label: string;
  subLabel: string;
  icon: string;
  category: "trigger" | "agent" | "model" | "tool" | "action";
  group: string;
}[] = [
  { id: "schedule", label: "Schedule Trigger", subLabel: "Every 24 hours", icon: "solar:clock-circle-bold-duotone", category: "trigger", group: "Triggers" },
  { id: "webhook", label: "Webhook Ingestion", subLabel: "POST /v1/lead", icon: "solar:bolt-bold-duotone", category: "trigger", group: "Triggers" },
  { id: "telegram", label: "Telegram Bot Trigger", subLabel: "on: message", icon: "logos:telegram", category: "trigger", group: "Triggers" },
  { id: "gpt4o", label: "OpenAI GPT-4o", subLabel: "Chat Model", icon: "logos:openai-icon", category: "model", group: "AI & Models" },
  { id: "claude-new", label: "Claude 3.7 Sonnet", subLabel: "Reasoning Model", icon: "simple-icons:anthropic", category: "model", group: "AI & Models" },
  { id: "gemini", label: "Google Gemini 2.5", subLabel: "Multimodal LLM", icon: "logos:google-gemini", category: "model", group: "AI & Models" },
  { id: "airtable", label: "Airtable Records", subLabel: "upsert: row", icon: "logos:airtable", category: "tool", group: "Tools & Integrations" },
  { id: "http", label: "HTTP Request", subLabel: "GET /api/v2", icon: "solar:global-bold-duotone", category: "action", group: "Tools & Integrations" },
  { id: "code", label: "Code in JavaScript", subLabel: "run: transform()", icon: "solar:code-bold-duotone", category: "action", group: "Tools & Integrations" },
  { id: "gmail", label: "Send Gmail Alert", subLabel: "send: email", icon: "logos:google-gmail", category: "action", group: "Tools & Integrations" },
];

export default function AIWorkflowCanvas() {
  const [nodes, setNodes] = useState<WorkflowNodeDef[]>(DEFAULT_NODES);
  const [positions, setPositions] = useState<Record<string, NodePos>>(() => {
    const map: Record<string, NodePos> = {};
    DEFAULT_NODES.forEach((n) => {
      map[n.id] = { ...n.initialPos };
    });
    return map;
  });

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [completedNodeIds, setCompletedNodeIds] = useState<string[]>([]);
  const [executionFinished, setExecutionFinished] = useState(false);
  const [statusText, setStatusText] = useState("Click \"Execute Workflow\" to watch orange n8n telemetry glitter through the swarm.");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nodePos = positions[id] || { x: 0, y: 0 };
    setDraggingId(id);
    setDragOffset({
      x: e.clientX - nodePos.x,
      y: e.clientY - nodePos.y,
    });
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggingId || !canvasRef.current) return;
      const newX = Math.max(10, Math.min(880, e.clientX - dragOffset.x));
      const newY = Math.max(10, Math.min(380, e.clientY - dragOffset.y));
      setPositions((prev) => ({
        ...prev,
        [draggingId]: { x: newX, y: newY },
      }));
    },
    [draggingId, dragOffset]
  );

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const deleteNode = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes((prev) => prev.filter((n) => n.id !== id));
  };

  const addNodeFromCatalog = (item: typeof AVAILABLE_CATALOG[0]) => {
    const newId = `${item.id}-${Date.now().toString().slice(-4)}`;
    const randomOffset = Math.floor(Math.random() * 40);
    const newPos: NodePos = {
      x: 380 + randomOffset,
      y: 190 + randomOffset,
    };

    const newNode: WorkflowNodeDef = {
      id: newId,
      label: item.label,
      subLabel: item.subLabel,
      icon: item.icon,
      category: item.category,
      initialPos: newPos,
    };

    setNodes((prev) => [...prev, newNode]);
    setPositions((prev) => ({ ...prev, [newId]: newPos }));
    setIsDrawerOpen(false);
  };

  const resetDefaultWorkflow = () => {
    setNodes(DEFAULT_NODES);
    const map: Record<string, NodePos> = {};
    DEFAULT_NODES.forEach((n) => {
      map[n.id] = { ...n.initialPos };
    });
    setPositions(map);
    setIsExecuting(false);
    setActiveNodeId(null);
    setCompletedNodeIds([]);
    setExecutionFinished(false);
    setStatusText("Default workflow restored. Ready to execute.");
  };

  const clearCanvas = () => {
    setNodes(DEFAULT_NODES.filter((n) => n.id === "trigger"));
    setIsExecuting(false);
    setActiveNodeId(null);
    setCompletedNodeIds([]);
    setExecutionFinished(false);
    setStatusText("Canvas cleared. Click \"+\" to add custom nodes to your workflow.");
  };

  const handleExecute = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setExecutionFinished(false);
    setCompletedNodeIds([]);

    const sequence = [
      { id: "trigger", text: "1/8: Ingesting WhatsApp incoming lead payload...", duration: 500 },
      { id: "agent", text: "2/8: Routing intent through Autonomous Agent Router...", duration: 600 },
      { id: "claude", text: "3/8: Reasoning prompt with Claude Sonnet 3.7...", duration: 550 },
      { id: "memory", text: "4/8: Retrieving conversation memory context...", duration: 500 },
      { id: "notion", text: "5/8: Querying knowledge base for pricing & FAQs...", duration: 500 },
      { id: "calendar", text: "6/8: Reserving calendar inspection slot...", duration: 500 },
      { id: "slack", text: "7/8: Alerting sales team channel in Slack...", duration: 500 },
      { id: "hubspot", text: "8/8: Upserting lead contact & activity in HubSpot...", duration: 550 },
      { id: "reply", text: "Final: Dispatching verified WhatsApp confirmation...", duration: 600 },
    ];

    let cumulativeTime = 0;
    const completedList: string[] = [];

    sequence.forEach((step, idx) => {
      setTimeout(() => {
        if (nodes.some((n) => n.id === step.id)) {
          setActiveNodeId(step.id);
          setStatusText(step.text);
        }
      }, cumulativeTime);

      cumulativeTime += step.duration;

      setTimeout(() => {
        if (nodes.some((n) => n.id === step.id)) {
          completedList.push(step.id);
          setCompletedNodeIds([...completedList]);
        }

        if (idx === sequence.length - 1) {
          setIsExecuting(false);
          setActiveNodeId(null);
          setExecutionFinished(true);
          setStatusText("✓ Execution complete (200 OK): 8 nodes executed in 2.1s with 100% SLA.");
        }
      }, cumulativeTime);
    });
  };

  const hasNode = (id: string) => nodes.some((n) => n.id === id);

  const p = positions;
  const triggerOut = { x: (p.trigger?.x || 40) + 105, y: (p.trigger?.y || 70) + 38 };
  const agentIn = { x: (p.agent?.x || 260) - 6, y: (p.agent?.y || 55) + 48 };
  const agentOut = { x: (p.agent?.x || 260) + 266, y: (p.agent?.y || 55) + 48 };
  const replyIn = { x: (p.reply?.x || 670) - 6, y: (p.reply?.y || 65) + 42 };

  const portChat = { x: (p.agent?.x || 260) + 60, y: (p.agent?.y || 55) + 95 };
  const portMemory = { x: (p.agent?.x || 260) + 135, y: (p.agent?.y || 55) + 95 };
  const portTool = { x: (p.agent?.x || 260) + 205, y: (p.agent?.y || 55) + 95 };

  const claudeIn = { x: (p.claude?.x || 40) + 28, y: (p.claude?.y || 280) - 4 };
  const memoryIn = { x: (p.memory?.x || 195) + 28, y: (p.memory?.y || 280) - 4 };
  const notionIn = { x: (p.notion?.x || 350) + 28, y: (p.notion?.y || 280) - 4 };
  const calendarIn = { x: (p.calendar?.x || 510) + 28, y: (p.calendar?.y || 280) - 4 };
  const slackIn = { x: (p.slack?.x || 670) + 28, y: (p.slack?.y || 280) - 4 };
  const hubspotIn = { x: (p.hubspot?.x || 830) + 28, y: (p.hubspot?.y || 280) - 4 };

  const makeCurve = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const dx = Math.abs(p2.x - p1.x) * 0.5;
    return `M ${p1.x} ${p1.y} C ${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${p2.x} ${p2.y}`;
  };

  const makeDownCurve = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    const dy = (p2.y - p1.y) * 0.55;
    return `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y + dy}, ${p2.x} ${p2.y - dy}, ${p2.x} ${p2.y}`;
  };

  const filteredCatalog = AVAILABLE_CATALOG.filter(
    (item) =>
      item.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.subLabel.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.group.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl border border-white/10 bg-[#08090d]/95 backdrop-blur-2xl overflow-hidden mb-12 shadow-2xl select-none">
      <style>{`
        @keyframes n8nGlitter {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        .n8n-glitter-path {
          stroke: #ff6d5a !important;
          stroke-width: 2.5px !important;
          stroke-dasharray: 8 6 !important;
          animation: n8nGlitter 0.75s linear infinite !important;
          filter: drop-shadow(0 0 6px rgba(255, 109, 90, 0.9));
        }
      `}</style>

      <div className="px-5 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="h-4 w-px bg-white/10 mx-1" />
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <Icon icon="simple-icons:n8n" className="h-4 w-4 text-[#ff6d5a]" />
            <span className="font-semibold text-white">n8n Lead Qualification Agent</span>
            <span className="text-neutral-500 hidden sm:inline">— Sequential Swarm Execution</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="px-3 py-1.5 rounded-full text-[11px] font-mono border border-purple-400/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Icon icon="lucide:plus" className="h-3.5 w-3.5" />
            <span>Add Node</span>
          </button>

          <button
            type="button"
            onClick={resetDefaultWorkflow}
            className="px-3 py-1.5 rounded-full text-[11px] font-mono border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={clearCanvas}
            className="px-3 py-1.5 rounded-full text-[11px] font-mono border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handleExecute}
            disabled={isExecuting}
            className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-lg ${
              isExecuting
                ? "bg-[#ff6d5a]/30 text-white border border-[#ff6d5a]/60 animate-pulse"
                : executionFinished
                ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                : "bg-gradient-to-r from-[#ff6d5a] to-[#ff4733] hover:from-[#ff8070] hover:to-[#ff5c4a] text-white shadow-[0_0_24px_rgba(255,109,90,0.6)] hover:scale-105 active:scale-95"
            }`}
          >
            <Icon
              icon={
                isExecuting
                  ? "lucide:loader-2"
                  : executionFinished
                  ? "lucide:check-circle-2"
                  : "lucide:play"
              }
              className={`h-4 w-4 ${isExecuting ? "animate-spin" : ""}`}
            />
            <span>
              {isExecuting
                ? "Executing..."
                : executionFinished
                ? "Executed ✓ (Run Again)"
                : "Execute"}
            </span>
          </button>
        </div>
      </div>

      <div
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full overflow-x-auto min-h-[460px] p-6 cursor-grab active:cursor-grabbing flex justify-center"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
        }}
      >
        <div className="relative w-[960px] min-w-[960px] h-[430px] shrink-0">
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {hasNode("trigger") && hasNode("agent") && (
              <path
                d={makeCurve(triggerOut, agentIn)}
                fill="none"
                strokeWidth="2"
                className={activeNodeId === "agent" || (activeNodeId === "trigger" && isExecuting) ? "n8n-glitter-path" : "stroke-white/20"}
              />
            )}

            {hasNode("agent") && hasNode("reply") && (
              <path
                d={makeCurve(agentOut, replyIn)}
                fill="none"
                strokeWidth="2"
                className={activeNodeId === "reply" ? "n8n-glitter-path" : "stroke-white/20"}
              />
            )}

            {hasNode("agent") && hasNode("claude") && (
              <path
                d={makeDownCurve(portChat, claudeIn)}
                fill="none"
                strokeWidth="1.8"
                className={activeNodeId === "claude" ? "n8n-glitter-path" : "stroke-white/20"}
              />
            )}

            {hasNode("agent") && hasNode("memory") && (
              <path
                d={makeDownCurve(portMemory, memoryIn)}
                fill="none"
                strokeWidth="1.8"
                className={activeNodeId === "memory" ? "n8n-glitter-path" : "stroke-white/20"}
              />
            )}

            {hasNode("agent") && hasNode("notion") && (
              <path
                d={makeDownCurve(portTool, notionIn)}
                fill="none"
                strokeWidth="1.8"
                className={activeNodeId === "notion" ? "n8n-glitter-path" : "stroke-white/20"}
              />
            )}

            {hasNode("agent") && hasNode("calendar") && (
              <path
                d={makeDownCurve(portTool, calendarIn)}
                fill="none"
                strokeWidth="1.8"
                className={activeNodeId === "calendar" ? "n8n-glitter-path" : "stroke-white/20"}
              />
            )}

            {hasNode("agent") && hasNode("slack") && (
              <path
                d={makeDownCurve(portTool, slackIn)}
                fill="none"
                strokeWidth="1.8"
                className={activeNodeId === "slack" ? "n8n-glitter-path" : "stroke-white/20"}
              />
            )}

            {hasNode("agent") && hasNode("hubspot") && (
              <path
                d={makeDownCurve(portTool, hubspotIn)}
                fill="none"
                strokeWidth="1.8"
                className={activeNodeId === "hubspot" ? "n8n-glitter-path" : "stroke-white/20"}
              />
            )}
          </svg>

          {nodes.map((node) => {
            const pos = positions[node.id] || node.initialPos;
            const isCurrentlyActive = activeNodeId === node.id;
            const isCompleted = completedNodeIds.includes(node.id);

            if (node.id === "trigger") {
              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleMouseDown(node.id, e)}
                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  className="absolute flex flex-col items-center cursor-move group"
                >
                  <div
                    className={`h-[76px] w-[110px] rounded-r-full rounded-l-md bg-[#121620] flex items-center justify-center relative transition-all duration-300 shadow-xl ${
                      isCurrentlyActive
                        ? "border-2 border-[#ff6d5a] shadow-[0_0_18px_rgba(255,109,90,0.9)] ring-2 ring-[#ff6d5a]/60"
                        : isCompleted
                        ? "border-2 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                        : "border border-white/15 hover:border-white/30"
                    }`}
                  >
                    <Icon icon={node.icon} className="h-9 w-9" />
                    <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black" />
                    {isCompleted && (
                      <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-200 mt-2 font-semibold whitespace-nowrap">
                    {node.label}
                  </span>
                </div>
              );
            }

            if (node.id === "agent") {
              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleMouseDown(node.id, e)}
                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  className="absolute flex flex-col items-center cursor-move group"
                >
                  <button
                    type="button"
                    onClick={(e) => deleteNode(node.id, e)}
                    className="absolute -top-2 -right-2 z-30 h-5 w-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                    title="Delete node"
                  >
                    ×
                  </button>
                  <div
                    className={`w-64 rounded-2xl bg-[#141722]/95 backdrop-blur-xl p-3.5 relative transition-all duration-300 shadow-2xl ${
                      isCurrentlyActive
                        ? "border-2 border-[#ff6d5a] shadow-[0_0_20px_rgba(255,109,90,0.95)] ring-2 ring-[#ff6d5a]/60"
                        : isCompleted
                        ? "border-2 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                        : "border border-white/15 hover:border-white/30"
                    }`}
                  >
                    <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-purple-400 ring-2 ring-black" />
                    <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-purple-400 ring-2 ring-black" />
                    <div className="flex items-start gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                        <Icon icon="solar:magic-stick-3-bold-duotone" className="h-5 w-5 text-purple-300" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white leading-tight">
                          {node.label}
                        </span>
                        <span className="text-[10px] font-mono text-purple-300 mt-0.5">
                          {node.subLabel}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span>Chat Model*</span>
                      <span>Memory</span>
                      <span>Tool +</span>
                    </div>
                  </div>
                </div>
              );
            }

            if (node.id === "reply") {
              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleMouseDown(node.id, e)}
                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  className="absolute flex flex-col items-center cursor-move group"
                >
                  <button
                    type="button"
                    onClick={(e) => deleteNode(node.id, e)}
                    className="absolute -top-2 -right-2 z-30 h-5 w-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                    title="Delete node"
                  >
                    ×
                  </button>
                  <div
                    className={`h-[76px] w-[110px] rounded-2xl bg-[#121620] flex items-center justify-center relative transition-all duration-300 shadow-xl ${
                      isCurrentlyActive
                        ? "border-2 border-[#ff6d5a] shadow-[0_0_18px_rgba(255,109,90,0.9)] ring-2 ring-[#ff6d5a]/60"
                        : isCompleted
                        ? "border-2 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                        : "border border-white/15 hover:border-white/30"
                    }`}
                  >
                    <Icon icon={node.icon} className="h-9 w-9" />
                    <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black" />
                    <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-black" />
                    {isCompleted && (
                      <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-200 mt-2 font-semibold whitespace-nowrap">
                    {node.label}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500">
                    {node.subLabel}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={node.id}
                onMouseDown={(e) => handleMouseDown(node.id, e)}
                style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                className="absolute flex flex-col items-center cursor-move group"
              >
                <button
                  type="button"
                  onClick={(e) => deleteNode(node.id, e)}
                  className="absolute -top-1 -right-1 z-30 h-4 w-4 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                  title="Delete node"
                >
                  ×
                </button>
                <div
                  className={`h-14 w-14 rounded-full bg-[#141720] flex items-center justify-center shadow-lg relative transition-all duration-300 ${
                    isCurrentlyActive
                      ? "border-2 border-[#ff6d5a] shadow-[0_0_16px_rgba(255,109,90,0.85)] ring-2 ring-[#ff6d5a]/60"
                      : isCompleted
                      ? "border-2 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                      : "border border-white/15 hover:border-white/30"
                  }`}
                >
                  <Icon icon={node.icon} className="h-7 w-7" />
                  {isCompleted && (
                    <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[9px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-neutral-300 mt-2 font-medium whitespace-nowrap">
                  {node.label}
                </span>
                {node.subLabel && (
                  <span className="text-[9px] font-mono text-neutral-500">
                    {node.subLabel}
                  </span>
                )}
              </div>
            );
          })}

          <div
            onClick={() => setIsDrawerOpen(true)}
            style={{ left: "840px", top: "82px" }}
            className="absolute flex items-center justify-center h-9 w-9 rounded-full bg-white/5 border border-white/15 hover:border-purple-400 hover:bg-purple-500/20 text-neutral-400 hover:text-white transition-all cursor-pointer shadow-md"
            title="Add Node"
          >
            <Icon icon="lucide:plus" className="h-4 w-4" />
          </div>
        </div>

        {isDrawerOpen && (
          <div className="absolute top-0 right-0 h-full w-80 bg-[#0d0f16]/98 border-l border-white/15 backdrop-blur-2xl p-4 z-40 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Icon icon="simple-icons:n8n" className="h-4 w-4 text-[#ff6d5a]" />
                <span className="text-xs font-mono font-bold text-white">Add Node</span>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="h-6 w-6 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="my-3">
              <input
                type="text"
                placeholder="Search nodes..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff6d5a]"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredCatalog.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => addNodeFromCatalog(item)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#ff6d5a]/50 text-left transition-all flex items-center gap-3 cursor-pointer group"
                >
                  <div className="h-8 w-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shrink-0">
                    <Icon icon={item.icon} className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-bold text-white truncate group-hover:text-[#ff6d5a] transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 truncate">
                      {item.subLabel}
                    </span>
                  </div>
                  <Icon icon="lucide:plus" className="h-3.5 w-3.5 text-neutral-500 ml-auto shrink-0 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-5 py-3 border-t border-white/10 bg-black/60 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isExecuting
                ? "bg-[#ff6d5a] animate-ping"
                : executionFinished
                ? "bg-emerald-400"
                : "bg-purple-400"
            }`}
          />
          <span className="text-neutral-200">{statusText}</span>
        </div>
        <span className="text-[#ff6d5a] font-semibold">Production SLA: 99.9% Uptime</span>
      </div>
    </div>
  );
}
