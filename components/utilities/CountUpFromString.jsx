"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

/**
 * Parses values like:
 * "12k+"     -> { value: 12, suffix: "k+" }
 * "85k+"     -> { value: 85, suffix: "k+" }
 * "€13,6m"   -> { value: 13.6, prefix: "€", suffix: "m" }
 */
function parseStat(input) {
  const str = input.trim();

  const prefixMatch = str.match(/^[^\d]+/);
  const prefix = prefixMatch ? prefixMatch[0] : "";

  const suffixMatch = str.match(/[^\d]+$/);
  const suffix = suffixMatch ? suffixMatch[0] : "";

  const numberPart = str
    .replace(prefix, "")
    .replace(suffix, "")
    .replace(",", ".");

  const value = parseFloat(numberPart);

  const decimals = numberPart.includes(".") ? 1 : 0;

  return { value, prefix, suffix, decimals };
}

export default function CountUpFromString({ text = "12k+", duration = 1.2 }) {
  const { value, prefix, suffix, decimals } = parseStat(text);
  const count = useMotionValue(0);

  const formatted = useTransform(count, (latest) => {
    let num = latest.toFixed(decimals);

    if (text.includes(",")) {
      num = num.replace(".", ",");
    }

    return `${prefix}${num}${suffix}`;
  });

  useEffect(() => {
    animate(count, value, {
      duration,
      ease: "easeOut",
    });
  }, [value, duration]);

  return <motion.span>{formatted}</motion.span>;
}
