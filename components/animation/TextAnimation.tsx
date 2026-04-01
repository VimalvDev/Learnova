"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef, ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface TextAnimationProps {
  children: ReactNode;
  colorInitial?: string;
  colorAccent?: string;
  colorFinal?: string;
}

interface SplitRefs {
  wordSplit: InstanceType<typeof SplitText>;
  charSplit: InstanceType<typeof SplitText>;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  children,
  colorInitial = "#2a2a2a",
  colorAccent = "var(--color-brand)",
  colorFinal = "#C0C0C0",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<SplitRefs[]>([]);
  const lastScrollProgress = useRef<number>(0);
  const colorTransitionTimers = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const completedChars = useRef<Set<number>>(new Set());

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRefs.current = [];
      lastScrollProgress.current = 0;
      colorTransitionTimers.current.clear();
      completedChars.current.clear();

      let elements: Element[] = [];
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current as Element];
      }

      elements.forEach((element) => {
        if (!(element instanceof HTMLElement)) return;

        const wordSplit = SplitText.create(element, {
          type: "words" as any,
          wordsClass: "word",
        });

        const charSplit = SplitText.create(wordSplit.words, {
          type: "chars" as any,
          charsClass: "char",
        });

        splitRefs.current.push({ wordSplit, charSplit });
      });

      const allChars = splitRefs.current.flatMap(
        ({ charSplit }) => charSplit.chars,
      );

      gsap.set(allChars, { color: colorInitial });

      const scheduleFinalTransition = (char: HTMLElement, index: number) => {
        if (colorTransitionTimers.current.has(index)) {
          clearTimeout(colorTransitionTimers.current.get(index));
        }

        const timer = setTimeout(() => {
          if (!completedChars.current.has(index)) {
            gsap.to(char, {
              duration: .1,
              ease: "none",
              color: colorFinal,
              onComplete: () => {
                completedChars.current.add(index);
              },
            });
          }
          colorTransitionTimers.current.delete(index);
        }, 10);

        colorTransitionTimers.current.set(index, timer);
      };

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 5,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalChars = allChars.length;
          const isScrollingDown = progress >= lastScrollProgress.current;
          const currentCharIndex = Math.floor(progress * totalChars);

          allChars.forEach((char: any, index: number) => {
            if (!isScrollingDown && index >= currentCharIndex) {
              if (colorTransitionTimers.current.has(index)) {
                clearTimeout(colorTransitionTimers.current.get(index));
                colorTransitionTimers.current.delete(index);
              }

              completedChars.current.delete(index);
              gsap.set(char, { color: colorInitial });
              return;
            }

            if (completedChars.current.has(index)) {
              return;
            }

            if (index <= currentCharIndex) {
              gsap.set(char, { color: colorAccent });
              if (!colorTransitionTimers.current.has(index)) {
                scheduleFinalTransition(char, index);
              }
            } else {
              gsap.set(char, { color: colorInitial });
            }
          });

          lastScrollProgress.current = progress;
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [colorInitial, colorAccent, colorFinal],
    },
  );

  // Try to clone the child element if it's a single valid element
  try {
    if (React.Children.count(children) === 1) {
      const child = React.Children.toArray(children)[0];
      if (React.isValidElement(child) && typeof child.type !== "string") {
        return React.cloneElement(child, {
          ...(child.props as any),
          ref: containerRef,
        });
      }
    }
  } catch {
    // Fallback to wrapper div if cloning fails
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default TextAnimation;
