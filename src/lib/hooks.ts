"use client";

import * as React from "react";

const emptySubscribe = () => () => {};

/**
 * `false` on the server and during the very first render, `true` once the
 * component has hydrated. Use it before rendering anything that depends on
 * browser-only state (theme, localStorage) so the HTML matches on both sides.
 */
export function useMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
