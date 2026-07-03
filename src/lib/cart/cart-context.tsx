"use client";

import { useMemo, useSyncExternalStore } from "react";
import * as cartStore from "@/lib/cart/cart-store";

function subscribeMounted(): () => void {
  return () => {};
}
function getMountedTrue() {
  return true;
}
function getMountedFalse() {
  return false;
}

export function useCart() {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );
  const isHydrated = useSyncExternalStore(
    subscribeMounted,
    getMountedTrue,
    getMountedFalse
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const totalCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return {
    items,
    isHydrated,
    subtotal,
    totalCount,
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    clearCart: cartStore.clearCart,
  };
}
