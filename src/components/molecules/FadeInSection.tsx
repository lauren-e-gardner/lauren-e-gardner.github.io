import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type FadeInSectionProps = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  // Space the empty section reserves before its content mounts, so sections
  // below it aren't all inside the viewport at once and anchor links still land.
  placeholderHeight?: CSSProperties["minHeight"];
  duration?: number;
};

/**
 * Renders an empty <section> until it scrolls into view, then mounts the
 * children and fades them in. Content stays mounted once revealed.
 */
export function FadeInSection({
  id,
  className,
  style,
  children,
  placeholderHeight = "50vh",
  duration = 0.8,
}: FadeInSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={ref}
      id={id}
      style={{ ...style, minHeight: isVisible ? style?.minHeight : placeholderHeight }}
    >
      {isVisible && (
        <motion.div
          className={className}
          style={{ width: "100%" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </section>
  );
}
