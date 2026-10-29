"use client";

// The chat lives in a sibling component, so callers ask for it by event
// rather than lifting the panel's state to the page.
export default function OpenChatButton({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("ya:open-chat"))}
      className={className}
    >
      {label}
    </button>
  );
}
