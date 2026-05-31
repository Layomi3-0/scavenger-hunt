import { ConvexError } from "convex/values";

export function readableError(err: unknown, fallback = "Something went wrong."): string {
  if (err instanceof ConvexError) {
    const data = err.data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object" && "message" in data) {
      const m = (data as { message?: unknown }).message;
      if (typeof m === "string") return m;
    }
  }
  if (err instanceof Error) {
    const msg = err.message;
    // Convex wraps non-ConvexError thrown errors like:
    //   [Request ID: xxx] Server Error\nUncaught Error: <msg>\n    at handler (..) Called by client
    const cleaned = msg
      .replace(/^\[Request ID:[^\]]+\]\s*/, "")
      .replace(/^Server Error\s+/i, "")
      .replace(/^Uncaught (?:Convex)?Error:\s+/, "")
      .replace(/\s+at handler[\s\S]*$/, "")
      .replace(/\s+Called by client\s*$/, "")
      .trim();
    if (cleaned) return cleaned;
  }
  return fallback;
}
