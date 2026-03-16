"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/landing-pages";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-4 divide-y divide-[var(--border)]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="first:pt-0">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-3 py-4 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
            >
              <h3 className="font-semibold text-[var(--foreground)]">{item.question}</h3>
              <ChevronDown
                size={20}
                className={`shrink-0 text-[var(--muted)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
            >
              <p className="pb-4 text-[var(--body-text)] leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
