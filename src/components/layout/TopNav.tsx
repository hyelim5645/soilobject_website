"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { NAV_ITEMS, SITE_NAME } from "@/lib/utils/constants";
import { useCart } from "@/lib/cart/cart-context";

export function TopNav() {
  const { totalCount, isHydrated } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mist-300/60 bg-paper/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="label-uppercase shrink-0 text-xs font-semibold tracking-[0.15em] text-ink sm:text-sm sm:tracking-[0.25em]"
        >
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label-uppercase text-xs text-ink transition-colors hover:text-wood-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 sm:gap-6">
          <LanguageSwitch />
          <Link
            href="/cart"
            className="label-uppercase relative mr-1 text-xs text-ink transition-colors hover:text-wood-600"
          >
            CART
            {isHydrated && totalCount > 0 && (
              <span className="absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-paper">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="label-uppercase text-xs text-ink md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label="메뉴 열기"
          >
            MENU
          </button>
        </div>
      </Container>

      {isMenuOpen && (
        <nav className="flex flex-col gap-4 border-t border-mist-300/60 bg-paper px-6 py-6 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label-uppercase text-xs text-ink"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
