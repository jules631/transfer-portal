"use client";

/**
 * Masked identity field. While masked, the real string is never rendered:
 * the DOM holds block characters shaped like the words, nothing else.
 */
export function Redacted({
  text,
  revealed,
}: {
  text: string;
  revealed: boolean;
}) {
  if (revealed) {
    return <span className="reveal-in">{text}</span>;
  }
  const mask = text
    .split(" ")
    .map((word) => "█".repeat(Math.max(2, word.length)))
    .join(" ");
  return (
    <span className="redacted px-1" aria-label="Redacted until mutual interest">
      {mask}
    </span>
  );
}
