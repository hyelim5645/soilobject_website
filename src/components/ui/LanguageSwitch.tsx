"use client";

import { useState } from "react";

/**
 * Visual-only language toggle. Content is Korean-primary with English
 * editorial accents throughout, matching the reference site's mixed-language
 * feel — this does not (yet) drive real locale routing or translation.
 */
export function LanguageSwitch() {
  const [locale, setLocale] = useState<"KR" | "EN">("KR");

  return (
    <button
      type="button"
      onClick={() => setLocale((prev) => (prev === "KR" ? "EN" : "KR"))}
      className="label-uppercase text-xs text-mist-500 transition-colors hover:text-ink"
      aria-label="언어 전환"
    >
      {locale}
    </button>
  );
}
