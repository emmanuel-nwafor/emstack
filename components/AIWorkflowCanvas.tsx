"use client";

import React, { useState, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";

interface NodePos {
  x: number;
  y: number;
}

const DEFAULT_POSITIONS: Record<string, NodePos> = {
  trigger: { x: 40, y: 70 },
  agent: { x: 250, y: 55 },
  reply: { x: 630, y: 65 },
  plusEnd: { x: 820, y: 88 },
  claude: { x: 40, y: 280 },
  memory: { x: 195, y: 280 },
  notion: { x: 350, y: 280 },
  calendar: { x: 510, y: 280 },
  slack: { x: 670, y: 280 },
  hubspot: { x: 830, y: 280 },
};

export default function AIWorkflowCanvas() {
  const [positions, setPositions] = useState<Record<string, NodePos>>(DEFAULT_POSITIONS);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [executionFinished, setExecutionFinished] = useState(false);
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
      const rect = canvasRef.current.getBoundingClientRect();
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

  const resetPositions = () => {
    setPositions(DEFAULT_POSITIONS);
  };

  const handleExecute = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setExecutionFinished(false);
    setActiveStep(1);

    setTimeout(() => {
      setActiveStep(2);
    }, 400);

    setTimeout(() => {
      setActiveStep(3);
    }, 900);

    setTimeout(() => {
      setActiveStep(4);
    }, 1400);

    setTimeout(() => {
      setIsExecuting(false);
      setExecutionFinished(true);
      setActiveStep(5);
    }, 1800);
  };

  const p = positions;

  const triggerOut = { x: (p.trigger?.x || 40) + 105, y: (p.trigger?.y || 70) + 38 };
  const agentIn = { x: (p.agent?.x || 250) - 6, y: (p.agent?.y || 55) + 48 };
  const agentOut = { x: (p.agent?.x || 250) + 266, y: (p.agent?.y || 55) + 48 };
  const replyIn = { x: (p.reply?.x || 630) - 6, y: (p.reply?.y || 65) + 42 };
  const replyOut = { x: (p.reply?.x || 630) + 106, y: (p.reply?.y || 65) + 42 };
  const endIn = { x: (p.plusEnd?.x || 820) - 4, y: (p.plusEnd?.y || 88) + 18 };

  const portChat = { x: (p.agent?.x || 250) + 60, y: (p.agent?.y || 55) + 95 };
  const portMemory = { x: (p.agent?.x || 250) + 135, y: (p.agent?.y || 55) + 95 };
  const portTool = { x: (p.agent?.x || 250) + 205, y: (p.agent?.y || 55) + 95 };

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

  return (
    <div className="relative w-full rounded-3xl border border-white/10 bg-[#08090d]/95 backdrop-blur-2xl overflow-hidden mb-12 shadow-2xl select-none">
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

      <div className="px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="h-4 w-px bg-white/10 mx-1" />
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
            <Icon icon="solar:diagram-up-bold-duotone" className="h-4 w-4 text-[#ff6d5a]" />
            <span className="font-semibold text-white">n8n Lead Qualification Agent</span>
            <span className="text-neutral-500 hidden sm:inline">— Drag any node anywhere</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetPositions}
            className="px-3 py-1.5 rounded-full text-[11px] font-mono border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            Reset Layout
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
                : "Execute Workflow"}
            </span>
          </button>
        </div>
      </div>

      <div
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full overflow-x-auto min-h-[460px] p-6 cursor-grab active:cursor-grabbing"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
        }}
      >
        <div className="relative min-w-[960px] h-[430px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ff6d5a" floodOpacity="0.9" />
              </filter>
            </defs>

            <path
              d={makeCurve(triggerOut, agentIn)}
              fill="none"
              strokeWidth="2"
              className={isExecuting && activeStep >= 1 ? "n8n-glitter-path" : "stroke-white/20"}
            />
            <path
              d={makeCurve(agentOut, replyIn)}
              fill="none"
              strokeWidth="2"
              className={isExecuting && activeStep >= 4 ? "n8n-glitter-path" : "stroke-white/20"}
            />
            <path
              d={makeCurve(replyOut, endIn)}
              fill="none"
              strokeWidth="2"
              className={isExecuting && activeStep >= 4 ? "n8n-glitter-path" : "stroke-white/20"}
            />

            <path
              d={makeDownCurve(portChat, claudeIn)}
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className={isExecuting && activeStep >= 2 ? "n8n-glitter-path" : "stroke-white/20"}
            />
            <path
              d={makeDownCurve(portMemory, memoryIn)}
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className={isExecuting && activeStep >= 2 ? "n8n-glitter-path" : "stroke-white/20"}
            />
            <path
              d={makeDownCurve(portTool, notionIn)}
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className={isExecuting && activeStep >= 3 ? "n8n-glitter-path" : "stroke-white/20"}
            />
            <path
              d={makeDownCurve(portTool, calendarIn)}
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className={isExecuting && activeStep >= 3 ? "n8n-glitter-path" : "stroke-white/20"}
            />
            <path
              d={makeDownCurve(portTool, slackIn)}
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className={isExecuting && activeStep >= 3 ? "n8n-glitter-path" : "stroke-white/20"}
            />
            <path
              d={makeDownCurve(portTool, hubspotIn)}
              fill="none"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className={isExecuting && activeStep >= 3 ? "n8n-glitter-path" : "stroke-white/20"}
            />
          </svg>

          <div
            onMouseDown={(e) => handleMouseDown("trigger", e)}
            style={{ left: `${p.trigger?.x || 40}px`, top: `${p.trigger?.y || 70}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div
              className={`h-16 w-24 rounded-l-full rounded-r-2xl bg-[#141720] flex items-center justify-center text-emerald-400 shadow-xl relative transition-all duration-300 ${
                isExecuting && activeStep === 1
                  ? "border-2 border-[#ff6d5a] shadow-[0_0_16px_rgba(255,109,90,0.85)] ring-2 ring-[#ff6d5a]/60"
                  : "border border-white/15"
              }`}
            >
              <Icon icon="logos:whatsapp-icon" className="h-8 w-8" />
              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#141720]" />
            </div>
            <span className="text-[11px] font-mono text-neutral-300 mt-2 font-medium whitespace-nowrap">
              New WhatsApp message
            </span>
          </div>

          <div
            onMouseDown={(e) => handleMouseDown("agent", e)}
            style={{ left: `${p.agent?.x || 250}px`, top: `${p.agent?.y || 55}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div
              className={`w-64 rounded-2xl bg-[#161a24] p-4 shadow-2xl relative transition-all duration-300 ${
                isExecuting && (activeStep === 2 || activeStep === 3)
                  ? "border-2 border-[#ff6d5a] shadow-[0_0_20px_rgba(255,109,90,0.7)] ring-2 ring-[#ff6d5a]/60"
                  : "border border-white/15"
              }`}
            >
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-purple-400 border-2 border-[#161a24]" />

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                  <Icon icon="solar:bot-bold-duotone" className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-white leading-tight">
                    Qualify and answer the lead
                  </span>
                  <span className="text-[10px] font-mono text-purple-300">
                    Autonomous Agent Router
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400 px-1">
                <span className="hover:text-purple-300">Chat Model*</span>
                <span className="hover:text-purple-300">Memory</span>
                <span className="hover:text-purple-300 flex items-center gap-1">
                  <span>Tool</span>
                  <span className="h-3 w-3 rounded-full bg-black border border-white/20 text-[8px] flex items-center justify-center text-white">
                    +
                  </span>
                </span>
              </div>

              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-purple-400 border-2 border-[#161a24]" />
            </div>
          </div>

          <div
            onMouseDown={(e) => handleMouseDown("reply", e)}
            style={{ left: `${p.reply?.x || 630}px`, top: `${p.reply?.y || 65}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div
              className={`h-16 w-24 rounded-2xl bg-[#141720] flex items-center justify-center text-emerald-400 shadow-xl relative transition-all duration-300 ${
                isExecuting && activeStep >= 4
                  ? "border-2 border-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.85)] ring-2 ring-emerald-400/60"
                  : "border border-white/15"
              }`}
            >
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#141720]" />
              <Icon icon="logos:whatsapp-icon" className="h-8 w-8" />
              <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-emerald-400 border-2 border-[#141720]" />
            </div>
            <span className="text-[11px] font-mono text-neutral-300 mt-2 font-medium whitespace-nowrap">
              Reply on whatsapp
            </span>
            <span className="text-[9px] font-mono text-neutral-500">Message: send</span>
          </div>

          <div
            onMouseDown={(e) => handleMouseDown("plusEnd", e)}
            style={{ left: `${p.plusEnd?.x || 820}px`, top: `${p.plusEnd?.y || 88}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div className="h-9 w-9 rounded-xl bg-black border border-white/20 flex items-center justify-center text-white font-bold text-base shadow-md">
              +
            </div>
          </div>

          <div
            onMouseDown={(e) => handleMouseDown("claude", e)}
            style={{ left: `${p.claude?.x || 40}px`, top: `${p.claude?.y || 280}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div
              className={`h-14 w-14 rounded-full bg-[#141720] flex items-center justify-center shadow-lg relative transition-all duration-300 ${
                isExecuting && activeStep >= 2
                  ? "border-2 border-[#ff6d5a] shadow-[0_0_16px_rgba(255,109,90,0.85)] ring-2 ring-[#ff6d5a]/60"
                  : "border border-white/15"
              }`}
            >
              <Icon icon="simple-icons:anthropic" className="h-7 w-7 text-orange-400" />
            </div>
            <span className="text-[10px] font-mono text-neutral-300 mt-2 font-medium whitespace-nowrap">
              Claude Sonnet 3.7
            </span>
          </div>

          <div
            onMouseDown={(e) => handleMouseDown("memory", e)}
            style={{ left: `${p.memory?.x || 195}px`, top: `${p.memory?.y || 280}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div
              className={`h-14 w-14 rounded-full bg-[#141720] flex items-center justify-center shadow-lg relative transition-all duration-300 ${
                isExecuting && activeStep >= 2
                  ? "border-2 border-[#ff6d5a] shadow-[0_0_16px_rgba(255,109,90,0.85)] ring-2 ring-[#ff6d5a]/60"
                  : "border border-white/15"
              }`}
            >
              <Icon icon="solar:database-bold-duotone" className="h-7 w-7 text-cyan-400" />
            </div>
            <span className="text-[10px] font-mono text-neutral-300 mt-2 font-medium whitespace-nowrap">
              Remember conversation
            </span>
          </div>

          <div
            onMouseDown={(e) => handleMouseDown("notion", e)}
            style={{ left: `${p.notion?.x || 350}px`, top: `${p.notion?.y || 280}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div
              className={`h-14 w-14 rounded-full bg-[#141720] flex items-center justify-center shadow-lg relative transition-all duration-300 ${
                isExecuting && activeStep >= 3
                  ? "border-2 border-[#ff6d5a] shadow-[0_0_16px_rgba(255,109,90,0.85)] ring-2 ring-[#ff6d5a]/60"
                  : "border border-white/15"
              }`}
            >
              <Icon icon="logos:notion-icon" className="h-7 w-7" />
            </div>
            <span className="text-[10px] font-mono text-neutral-300 mt-2 font-medium whitespace-nowrap">
              Read FAQ & Pricing
            </span>
            <span className="text-[9px] font-mono text-neutral-500">search: page</span>
          </div>

          <div
            onMouseDown={(e) => handleMouseDown("calendar", e)}
            style={{ left: `${p.calendar?.x || 510}px`, top: `${p.calendar?.y || 280}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div
              className={`h-14 w-14 rounded-full bg-[#141720] flex items-center justify-center shadow-lg relative transition-all duration-300 ${
                isExecuting && activeStep >= 3
                  ? "border-2 border-[#ff6d5a] shadow-[0_0_16px_rgba(255,109,90,0.85)] ring-2 ring-[#ff6d5a]/60"
                  : "border border-white/15"
              }`}
            >
              <Icon icon="logos:google-calendar" className="h-7 w-7" />
            </div>
            <span className="text-[10px] font-mono text-neutral-300 mt-2 font-medium whitespace-nowrap">
              Book a demo call
            </span>
            <span className="text-[9px] font-mono text-neutral-500">Create: event</span>
          </div>

          <div
            onMouseDown={(e) => handleMouseDown("slack", e)}
            style={{ left: `${p.slack?.x || 670}px`, top: `${p.slack?.y || 280}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div
              className={`h-14 w-14 rounded-full bg-[#141720] flex items-center justify-center shadow-lg relative transition-all duration-300 ${
                isExecuting && activeStep >= 3
                  ? "border-2 border-[#ff6d5a] shadow-[0_0_16px_rgba(255,109,90,0.85)] ring-2 ring-[#ff6d5a]/60"
                  : "border border-white/15"
              }`}
            >
              <Icon icon="logos:slack-icon" className="h-7 w-7" />
            </div>
            <span className="text-[10px] font-mono text-neutral-300 mt-2 font-medium whitespace-nowrap">
              Hand off to sales rep
            </span>
            <span className="text-[9px] font-mono text-neutral-500">Post: message</span>
          </div>

          <div
            onMouseDown={(e) => handleMouseDown("hubspot", e)}
            style={{ left: `${p.hubspot?.x || 830}px`, top: `${p.hubspot?.y || 280}px` }}
            className="absolute flex flex-col items-center cursor-move"
          >
            <div
              className={`h-14 w-14 rounded-full bg-[#141720] flex items-center justify-center shadow-lg relative transition-all duration-300 ${
                isExecuting && activeStep >= 3
                  ? "border-2 border-[#ff6d5a] shadow-[0_0_16px_rgba(255,109,90,0.85)] ring-2 ring-[#ff6d5a]/60"
                  : "border border-white/15"
              }`}
            >
              <Icon icon="logos:hubspot" className="h-7 w-7" />
            </div>
            <span className="text-[10px] font-mono text-neutral-300 mt-2 font-medium whitespace-nowrap">
              Update lead in HubSpot
            </span>
            <span className="text-[9px] font-mono text-neutral-500">upsert: contact</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 border-t border-white/10 bg-black/60 flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400">
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
          <span>
            {isExecuting && activeStep === 1 && "Ingesting WhatsApp message payload..."}
            {isExecuting && activeStep === 2 && "Claude 3.7 reasoning & retrieving conversation memory..."}
            {isExecuting && activeStep === 3 && "Executing parallel tools: Notion FAQ · Google Calendar · Slack · HubSpot..."}
            {isExecuting && activeStep >= 4 && "Compiling structured reply & sending WhatsApp message..."}
            {executionFinished && "Workflow execution succeeded (200 OK): Demo booked, Slack alert sent, HubSpot contact upserted in 1,240ms."}
            {!isExecuting && !executionFinished && "Click \"Execute Workflow\" to watch orange n8n telemetry glitter through the swarm."}
          </span>
        </div>
        <span className="text-[#ff6d5a] font-semibold">Production SLA: 99.9% Uptime</span>
      </div>
    </div>
  );
}
