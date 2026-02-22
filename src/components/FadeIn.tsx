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

    // If the element is already partially in view on mount (e.g. hero), show it immediately
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) {
      el.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
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
