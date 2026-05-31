"use client";

import { useEffect, useState } from "react";
import type { Id } from "../../convex/_generated/dataModel";

const KEY = "eden.playerId";

export function usePlayerId() {
  const [playerId, setPlayerIdState] = useState<Id<"players"> | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setPlayerIdState(raw as Id<"players">);
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const setPlayerId = (id: Id<"players"> | null) => {
    setPlayerIdState(id);
    try {
      if (id) window.localStorage.setItem(KEY, id);
      else window.localStorage.removeItem(KEY);
    } catch {
      // ignore
    }
  };

  return { playerId, setPlayerId, hydrated };
}
