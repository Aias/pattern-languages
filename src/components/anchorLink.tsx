import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

interface AnchorLinkProps {
  to: string;
  children: ReactNode;
}

export default function AnchorLink({ to, children }: AnchorLinkProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              window.location.replace(`${window.location.pathname}#${to}`);
            }, 500);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: [0.1] },
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [to]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const el = document.getElementById(to);

    if (el && observerRef.current) {
      observerRef.current.observe(el);
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <a href={`#${to}`} onClick={handleClick}>
      {children}
    </a>
  );
}
