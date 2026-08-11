import { useEffect, useRef, useState } from "react";

/**
 * Reports whether the element is in (or has entered) the viewport, backed by
 * IntersectionObserver. With `once: true` (the default) it fires only the
 * first time the element becomes visible and then disconnects.
 */
export function useInView<T extends HTMLElement>(options?: { once?: boolean; margin?: string }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? true;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: options?.margin ?? "-80px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, options?.margin]);

  return { ref, inView };
}
