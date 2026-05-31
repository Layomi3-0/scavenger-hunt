"use client";

import { useEffect, useState } from "react";
import { usePlayerId } from "@/lib/usePlayerId";
import { SignIn } from "@/components/SignIn";
import { HuntBoard } from "@/components/HuntBoard";

export default function Home() {
  const { playerId, setPlayerId, hydrated } = usePlayerId();
  const [hasConvex, setHasConvex] = useState(true);

  useEffect(() => {
    setHasConvex(Boolean(process.env.NEXT_PUBLIC_CONVEX_URL));
  }, []);

  if (!hydrated) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="eyebrow text-ink-mute/70 text-[11px]">loading…</p>
      </div>
    );
  }

  if (!hasConvex) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="eyebrow text-[11px] text-coral mb-3">setup needed</p>
          <h1 className="font-display text-[36px] leading-tight text-ink">
            Connect Convex to begin.
          </h1>
          <p className="mt-4 text-sm text-ink-soft leading-relaxed">
            Run <code className="font-mono text-coral">npx convex dev</code> in
            this project to provision a backend. Convex will set{" "}
            <code className="font-mono text-coral">NEXT_PUBLIC_CONVEX_URL</code>{" "}
            in <code className="font-mono text-coral">.env.local</code>{" "}
            automatically.
          </p>
        </div>
      </div>
    );
  }

  if (!playerId) {
    return (
      <SignIn
        onSignedIn={(id) => {
          setPlayerId(id);
        }}
      />
    );
  }

  return <HuntBoard playerId={playerId} onSignOut={() => setPlayerId(null)} />;
}
