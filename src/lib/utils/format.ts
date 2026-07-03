export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("ko-KR")}원`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
