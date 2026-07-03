export function QuantityStepper({
  quantity,
  onChange,
  max,
}: {
  quantity: number;
  onChange: (next: number) => void;
  max?: number;
}) {
  const canIncrease = max === undefined || quantity < max;

  return (
    <div className="inline-flex items-center border border-mist-300">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="flex h-10 w-10 items-center justify-center text-ink hover:bg-paper-dim disabled:cursor-not-allowed disabled:opacity-30"
        disabled={quantity <= 1}
        aria-label="수량 감소"
      >
        −
      </button>
      <span className="flex h-10 w-10 items-center justify-center text-sm text-ink">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className="flex h-10 w-10 items-center justify-center text-ink hover:bg-paper-dim disabled:cursor-not-allowed disabled:opacity-30"
        disabled={!canIncrease}
        aria-label="수량 증가"
      >
        +
      </button>
    </div>
  );
}
