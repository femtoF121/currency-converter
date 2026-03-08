"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export const useAnimatedCounter = (
  value: number,
  decimals: number = 2,
  duration: number = 0.5,
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef(value);

  useGSAP(() => {
    const counter = { value: prevValueRef.current };

    gsap.to(counter, {
      value,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        if (inputRef.current)
          inputRef.current.value = counter.value.toFixed(decimals);
      },
    });

    prevValueRef.current = value;
  }, [value, decimals, duration]);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.value = value.toFixed(decimals);
  //   }
  // }, []);

  return inputRef;
};
