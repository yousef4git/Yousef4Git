"use client";
import { useState } from "react";

// A bulleted list that shows every item on wide screens and the first few on
// a phone, with one plain button to open the rest. The full list is always
// in the HTML, so nothing is hidden from search or from a reader with
// JavaScript off.
export default function MoreList({ items, show = 3 }: { items: readonly string[]; show?: number }) {
  const [open, setOpen] = useState(false);
  const rest = items.length - show;

  return (
    <>
      <ul className="mt-3 space-y-2.5">
        {items.map((text, i) => (
          <li
            key={text}
            className={`relative pl-4 text-sm leading-relaxed text-stone ${
              i >= show && !open ? "hidden md:block" : ""
            }`}
          >
            <span aria-hidden className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-noon" />
            {text}
          </li>
        ))}
      </ul>
      {rest > 0 && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 text-sm font-medium text-noon underline-offset-4 hover:underline md:hidden"
        >
          Show {rest} more
        </button>
      )}
    </>
  );
}
