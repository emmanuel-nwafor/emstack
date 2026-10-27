"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { InteractiveComposerProps } from "@/constants";

const DEFAULT_TOPICS = [
  "An AI Automation Swarm",
  "A Full-Stack Platform",
  "System Architecture & Audit",
  "Contract Work",
  "Full-time Role",
  "Something else",
];

export default function InteractiveComposer({ topics = DEFAULT_TOPICS }: InteractiveComposerProps) {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTopic(topics[0]);
  }, [topics]);

  const contactEmail = "echinecherem729@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Inquiry: ${topic}] from ${name || "Portfolio Visitor"}`);
    const body = encodeURIComponent(
      `Hi Emmanuel,\n\nTopic: ${topic}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start select-none">
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        <div>
          <span className="text-xs font-mono font-semibold text-purple-300 uppercase tracking-widest">
            06 — Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-2 leading-tight">
            Let&apos;s build systems that{" "}
            <em className="font-serif italic font-normal text-purple-300">
              hold up.
            </em>
          </h2>
          <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
            Open to autonomous AI automation, full-stack platform engineering, and technical advisory. The fastest way to reach me is directly via email.
          </p>
        </div>

        <div className="flex items-center justify-between p-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl">
          <div className="flex items-center gap-2 truncate mr-2">
            <span className="text-purple-300 font-mono font-bold text-sm">@</span>
            <span className="text-xs sm:text-sm font-mono text-white font-medium truncate">
              {contactEmail}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-white transition-all active:scale-95 cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Icon icon="lucide:check" className="h-3.5 w-3.5 text-purple-300" />
                <span className="text-purple-300 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Icon icon="lucide:copy" className="h-3.5 w-3.5 text-neutral-300" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <ul className="space-y-2 text-xs font-mono text-neutral-300">
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-purple-300 animate-pulse shadow-[0_0_6px_rgba(216,180,254,0.7)]" />
            <span>Available for new contracts Q3/Q4</span>
          </li>
          <li className="flex items-center gap-2 text-neutral-400">
            <Icon icon="lucide:zap" className="h-3.5 w-3.5 text-purple-300 shrink-0" />
            <span>Usually replies within 24 hours</span>
          </li>
          <li className="flex items-center gap-2 text-neutral-400">
            <Icon icon="lucide:globe" className="h-3.5 w-3.5 text-purple-300 shrink-0" />
            <span>Remote-first — overlapping US &amp; European hours</span>
          </li>
        </ul>
      </div>

      <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Write me a note
          </span>
          <span className="text-[11px] font-mono text-purple-300">
            Direct dispatch to inbox
          </span>
        </div>

        <form onSubmit={handleSend} className="mt-5 space-y-5">
          <div>
            <label className="block text-xs font-mono text-neutral-300 mb-2.5">
              What are we building?
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => {
                const isSelected = topic === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-white text-black font-bold shadow-md shadow-white/5"
                        : "border border-white/10 bg-white/[0.03] text-neutral-300 hover:border-purple-300/40 hover:text-purple-200"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-purple-300/60 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-neutral-300 mb-1">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-purple-300/60 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono text-neutral-300">
                Message Brief
              </label>
              <span className="text-[10px] font-mono text-neutral-400">
                {message.length} / 1200
              </span>
            </div>
            <textarea
              rows={4}
              maxLength={1200}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="A few lines is plenty — what system are you looking to architect, and what is your target timeline?"
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-purple-300/60 transition-colors resize-none leading-relaxed"
              required
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-white/5"
            >
              <span>Send Message</span>
              <Icon icon="lucide:send" className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
