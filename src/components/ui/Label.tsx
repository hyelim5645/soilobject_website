import type { ReactNode } from "react";

export function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`label-uppercase text-xs font-medium text-mist-500 ${className}`}
    >
      {children}
    </span>
  );
}
