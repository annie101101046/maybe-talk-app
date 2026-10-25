"use client";

import { useEffect, useRef, ReactNode, ElementType, ComponentPropsWithRef } from "react";

type FadeInProps<T extends ElementType = "div"> = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds — maps to data-delay attribute */
  delay?: number;
  /** Threshold: fraction of element visible before triggering (default 0.15) */
  threshold?: number;
  /** Root margin for the IntersectionObserver */
  rootMargin?: string;
  /** HTML tag to render as (default: div) */
  as?: T;
} & Omit<ComponentPropsWithRef<T>, "as" | "children" | "className" | "delay">;

export default function FadeIn<T extends ElementType = "div">({
  children,
  className = "",
  delay,
  threshold = 0.15,
  rootMargin = "0px 0px -40px 0px",
  as,
  ...rest
}: FadeInProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Never gate readability on the observer. Show immediately, including when
    // IntersectionObserver is missing (older iOS) or the user prefers less motion.
    const show = () => el.classList.add("visible");
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    show();

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) show();
          });
        },
        { threshold: 0, rootMargin: "0px" }
      );
      observer.observe(el);
    } catch {
      show();
    }

    return () => observer?.disconnect();
  }, [threshold, rootMargin]);

  const delayAttr = delay !== undefined ? { "data-delay": String(delay) } : {};

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`fade-in ${className}`}
      {...delayAttr}
      {...rest}
    >
      {children}
    </Tag>
  );
}
