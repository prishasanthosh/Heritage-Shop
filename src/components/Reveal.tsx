import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

/**
 * Wraps children in a subtle fade-up-on-scroll reveal, once, via
 * IntersectionObserver. Pass `delay` (ms) to stagger a group of siblings.
 */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ animationDelay: inView ? `${delay}ms` : undefined }}
    >
      {children}
    </div>
  );
}
