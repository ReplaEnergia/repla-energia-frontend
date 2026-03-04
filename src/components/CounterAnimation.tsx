import { useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterAnimationProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

const CounterAnimation = ({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className,
  decimals = 0,
}: CounterAnimationProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-40px 0px" });

  useEffect(() => {
    if (!isInView) return;

    const node = ref.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = prefix + value.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, duration, suffix, prefix, decimals]);

  return (
    <span ref={inViewRef}>
      <span ref={ref} className={className}>
        {prefix}
        {from}
        {suffix}
      </span>
    </span>
  );
};

export default CounterAnimation;
