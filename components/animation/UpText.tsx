"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef, RefObject, ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface UpTextProps {
  children: ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  duration?: number;
  splitType?: "lines" | "words" | "chars";
  staggerFrom?: "start" | "end" | "center" | "edges";
  disableOnMobile?: boolean;
}

const UpText: React.FC<UpTextProps> = ({
  children,
  animateOnScroll = true,
  delay = 0,
  duration,
  splitType = "lines",
  staggerFrom = "start",
  disableOnMobile = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLElement[]>([]);
  const splitRef = useRef<Array<InstanceType<typeof SplitText>>>([]);
  const lines = useRef<Array<HTMLElement | Text>>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const init = () => {
        if (disableOnMobile && window.innerWidth < 768) return;
        if (!containerRef.current) return;

        splitRef.current = [];
        elementRef.current = [];
        lines.current = [];

        let elements: Element[] = [];
        if (containerRef.current.hasAttribute("data-copy-wrapper")) {
          elements = Array.from(containerRef.current.children);
        } else {
          elements = [containerRef.current as Element];
        }

        elements.forEach((element) => {
          if (!(element instanceof HTMLElement)) return;
          elementRef.current.push(element);

          // ✅ Check if element has actual text content
          const hasText =
            element.textContent?.trim().length > 0 &&
            !(element instanceof SVGElement) &&
            !element.querySelector("svg");

          if (hasText) {
            const split = SplitText.create(element, {
              type: splitType as any,
              mask: splitType as any,
              ...(splitType === "chars" && { charsClass: "char++" }),
              ...(splitType === "words" && { wordsClass: "word++" }),
              ...(splitType === "lines" && { linesClass: "line++" }),
            });
            splitRef.current.push(split);
            const splitItems: Element[] =
              splitType === "chars"
                ? split.chars
                : splitType === "words"
                  ? split.words
                  : split.lines;
            lines.current.push(
              ...(splitItems.map((item) => item as HTMLElement) || [])
            );
          } else {
            // ✅ No text (SVG/icon) — animate the element directly
            lines.current.push(element);
            // Wrap in overflow:hidden so the slide-up is masked
            element.style.overflow = "hidden";
            element.style.display = "inline-flex";
          }
        });

        gsap.set(lines.current, { yPercent: 110 });

        const easeAnim = splitType === "chars" ? "back.out(.7)" : "power4.out";
        const animationProps = {
          yPercent: 0,
          duration: duration,
          stagger: {
            amount: 0.4,
            from: staggerFrom,
          },
          ease: easeAnim,
          delay: delay,
        };

        if (animateOnScroll) {
          gsap.to(lines.current, {
            ...animationProps,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",

              once: true,
              fastScrollEnd: true,
            },
          });
        } else {
          gsap.to(lines.current, animationProps);
        }
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(init);
      } else {
        init();
      }

      return () => {
        splitRef.current.forEach((split) => split?.revert());
      };
    },
    {
      scope: containerRef,
      dependencies: [
        animateOnScroll,
        delay,
        duration,
        splitType,
        staggerFrom,
        disableOnMobile,
      ],
    },
  );

  // Try to clone the child element if it's a single valid element and has a displayName or is a component
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
    <div className="" ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default UpText;
