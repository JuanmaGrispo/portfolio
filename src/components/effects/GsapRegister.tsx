"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

export function GsapRegister() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return null;
}
