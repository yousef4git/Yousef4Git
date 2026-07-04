"use client";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { siteContent } from "@/content/site";

const STARTERS = [
  "What did you build at Rusokh?",
  "What will you do at noon?",
  "How does the risk-triage system work?",
];

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const busy = status === "submitted" || status === "streaming";

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    sendMessage({ text });
    setInput("");
  };

  if (error) {
    const { contact } = siteContent;
    return (
      <div data-chat-fallback className="rounded-lg border border-gold/20 bg-night p-6 text-left">
        <p className="text-stone">The chat is resting right now. Reach me directly instead:</p>
        <div className="mt-4 flex flex-wrap gap-6 font-mono text-sm">
          <a className="text-gold hover:text-gold-bright" href={`mailto:${contact.email}`}>Email</a>
          <a className="text-gold hover:text-gold-bright" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="text-gold hover:text-gold-bright" href={contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    );
  }

  return (
    <div data-chat-panel className="rounded-lg border border-gold/20 bg-night p-6 text-left">
      <div className="max-h-80 space-y-4 overflow-y-auto" aria-live="polite">
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {STARTERS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-gold/30 px-4 py-1.5 font-mono text-xs text-gold hover:bg-gold/10"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "text-gold-bright" : "text-bone"}>
            <span className="font-mono text-xs uppercase text-stone">{m.role === "user" ? "You" : "Yousef"}</span>
            {m.parts.map((part, i) =>
              part.type === "text" ? <p key={i} className="mt-1 whitespace-pre-wrap">{part.text}</p> : null
            )}
          </div>
        ))}
        {busy && <p className="animate-pulse font-mono text-xs text-stone">thinking…</p>}
      </div>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Ask about my work"
          placeholder="Ask about my work…"
          className="flex-1 rounded border border-gold/20 bg-coal px-4 py-2 text-bone placeholder:text-stone focus:border-gold focus:outline-none"
        />
        <button type="submit" disabled={busy} className="rounded bg-gold px-5 py-2 font-mono text-sm text-night hover:bg-gold-bright disabled:opacity-50">
          Send
        </button>
      </form>
    </div>
  );
}
