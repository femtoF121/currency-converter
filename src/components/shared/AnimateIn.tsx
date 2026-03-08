"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  targetClass: string;
  className?: string;
}

export const AnimateIn = ({
  children,
  targetClass,
  className,
}: AnimateInProps) => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(targetClass, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.3,
        ease: "power2.in",
      });
    },
    { scope: container },
  );

  return (
    <div className={className} ref={container}>
      {children}
    </div>
  );
};
