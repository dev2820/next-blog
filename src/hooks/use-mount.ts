import { type EffectCallback, useEffect } from "react";

export const useMount = (fn: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, []);
};
