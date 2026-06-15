import { useLayoutEffect, useRef, useState } from "react";

const MOBILE_MAX_WIDTH_PX = 767;

function ScrollRevealImage({ className, children, fadeOnly = false }) {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const isMobileViewport = window.matchMedia(
      `(max-width: ${MOBILE_MAX_WIDTH_PX}px)`,
    ).matches;

    if (!isMobileViewport) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const rect = element.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08;

    if (inView) {
      setVisible(true);
      return;
    }

    setEnabled(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const rootClassName = [
    "scroll-reveal-image",
    fadeOnly ? "scroll-reveal-image--fade-only" : "",
    enabled ? "scroll-reveal-image--enabled" : "",
    visible ? "scroll-reveal-image--visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={rootClassName}>
      {children}
    </div>
  );
}

export default ScrollRevealImage;
