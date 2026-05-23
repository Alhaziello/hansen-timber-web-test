"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortableText } from "@portabletext/react";

export interface FaqItem {
  question: string;
  answer: any; // Accepts Sanity Portable Text array or custom ReactNode
}

const faqPtComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }: { value?: any; children?: React.ReactNode }) => {
      const rel = value?.href && !value.href.startsWith("/") ? "noopener noreferrer" : undefined;
      const target = value?.href && !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <a
          href={value?.href || "#"}
          rel={rel}
          target={target}
          className="text-muted-oak hover:text-charcoal underline transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

interface FaqAccordionProps {
  title?: string;
  subtitle?: string;
  items: FaqItem[];
  className?: string;
}

export default function FaqAccordion({
  title = "frequently asked questions",
  subtitle,
  items,
  className = "",
}: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return null;
  }

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          {subtitle && (
            <span className="text-muted-oak text-xs uppercase tracking-[0.3em] font-sans font-semibold block mb-3">
              {subtitle}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-serif text-charcoal italic lowercase">
            {title}
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="border-t border-gray-300">
          {items.map((item, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div key={idx} className="border-b border-gray-300">
                {/* Header Row */}
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex justify-between items-center py-5 cursor-pointer text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg md:text-xl text-charcoal group-hover:text-muted-oak transition-colors duration-300 pr-6">
                    {item.question}
                  </span>
                  
                  {/* Rotating Icon */}
                  <div className="w-8 h-8 rounded-full border border-charcoal/10 flex items-center justify-center group-hover:border-charcoal transition-colors duration-300 shrink-0">
                    <motion.svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="text-charcoal"
                    >
                      <path
                        d="M6 1V11M1 6H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </div>
                </button>

                {/* Collapsible Answer Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                          opacity: { duration: 0.25, delay: 0.05 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
                          opacity: { duration: 0.15 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 text-charcoal/70 font-sans leading-relaxed text-sm md:text-base max-w-3xl prose-hansen">
                        {Array.isArray(item.answer) ? (
                          <PortableText value={item.answer} components={faqPtComponents} />
                        ) : (
                          item.answer
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
