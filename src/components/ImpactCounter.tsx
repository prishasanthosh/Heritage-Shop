import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

export function ImpactCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [display, setDisplay] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (!inView || animated.current) return;
    animated.current = true;

    const duration = 1500;
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl md:text-5xl font-semibold text-terracotta">
        {display.toLocaleString("en-IN")}
        {suffix}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.14em] text-cream/80">{label}</p>
    </div>
  );
}
