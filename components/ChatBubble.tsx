"use client";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { gsap, useGSAP } from "@/lib/gsap";
import { siteContent } from "@/content/site";

const STORAGE_KEY = "ya-chat-session-v1";
const MAX_INPUT = 500;

const STARTERS = [
  "What did you build at Rusokh?",
  "What will you do at noon?",
  "How does the risk-triage system work?",
];

function loadSession(): UIMessage[] | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UIMessage[]) : null;
  } catch {
    return null;
  }
}

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const wrap = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error, setMessages } = useChat();
  const busy = status === "submitted" || status === "streaming";

  // The conversation lives as long as the browser session: closing the
  // bubble or reloading keeps it, closing the tab starts fresh.
  useEffect(() => {
    const saved = loadSession();
    if (saved?.length) setMessages(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!messages.length) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Storage full or blocked; the in-memory conversation still works.
    }
  }, [messages]);

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(panel, { autoAlpha: open ? 1 : 0, scale: 1, y: 0 });
        return;
      }
      if (open) {
        gsap.to(panel, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.35,
          ease: "back.out(1.4)",
          transformOrigin: "bottom right",
        });
      } else {
        gsap.to(panel, {
          autoAlpha: 0,
          scale: 0.92,
          y: 12,
          duration: 0.22,
          ease: "power2.in",
          transformOrigin: "bottom right",
        });
      }
    },
    { dependencies: [open], scope: wrap }
  );

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("ya:open-chat", openChat);
    return () => window.removeEventListener("ya:open-chat", openChat);
  }, []);

  const send = (text: string) => {
    const t = text.trim().slice(0, MAX_INPUT);
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  const { contact } = siteContent;

  return (
    <div ref={wrap}>
      <div
        ref={panelRef}
        id="chat-panel"
        data-chat-panel
        role="dialog"
        aria-label="Chat with Yousef"
        className="invisible fixed bottom-[5.5rem] right-4 z-[70] flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-bone/10 bg-night/80 opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl backdrop-saturate-150"
      >
        <header className="flex items-start justify-between border-b border-bone/10 px-5 py-4">
          <div>
            <p className="font-display text-xl text-bone">Ask me anything</p>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-stone">
              Answers come from my CV
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-stone transition-colors hover:bg-bone/10 hover:text-bone"
          >
            <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        {error ? (
          <div data-chat-fallback className="p-5">
            <p className="text-sm text-stone">
              The chat is resting right now. Reach me directly instead:
            </p>
            <div className="mt-4 flex flex-wrap gap-5 font-mono text-sm">
              <a className="text-gold hover:text-gold-bright" href={`mailto:${contact.email}`}>
                Email
              </a>
              <a
                className="text-gold hover:text-gold-bright"
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="text-gold hover:text-gold-bright"
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        ) : (
          <>
            <div
              ref={logRef}
              className="max-h-[45vh] min-h-40 space-y-4 overflow-y-auto px-5 py-4"
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2">
                  {STARTERS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full border border-gold/30 px-4 py-1.5 text-left font-mono text-xs text-gold transition-colors hover:bg-gold/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "text-gold-bright" : "text-bone"}>
                  <span className="font-mono text-[10px] uppercase text-stone">
                    {m.role === "user" ? "You" : "Yousef"}
                  </span>
                  {m.parts.map((part, i) =>
                    part.type === "text" ? (
                      <p key={i} className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">
                        {part.text}
                      </p>
                    ) : null
                  )}
                </div>
              ))}
              {busy && <p className="animate-pulse font-mono text-xs text-stone">thinking…</p>}
            </div>
            <form
              className="flex gap-2 border-t border-bone/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={MAX_INPUT}
                aria-label="Ask about my work"
                placeholder="Ask about my work…"
                className="min-w-0 flex-1 rounded-full border border-gold/20 bg-coal/80 px-4 py-2 text-sm text-bone placeholder:text-stone focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                disabled={busy}
                className="rounded-full bg-gold px-4 py-2 font-mono text-sm text-night transition-colors hover:bg-gold-bright disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
      <button
        data-chat-bubble
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close the chat" : "Chat with Yousef"}
        className="liquid-glass fixed bottom-4 right-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full text-gold transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12c0 4.1-4 7.4-9 7.4-1 0-2-.1-2.9-.4L4 21l1.2-3.6C3.8 16 3 14.1 3 12c0-4.1 4-7.4 9-7.4s9 3.3 9 7.4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="8.5" cy="12" r="1" fill="currentColor" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <circle cx="15.5" cy="12" r="1" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
