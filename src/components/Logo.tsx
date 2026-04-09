"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

function ShEmblem({
  className,
  fg,
  bg,
  ring,
}: {
  className?: string;
  fg: string;
  bg: string;
  ring: string;
}) {
  const uid = useId().replace(/:/g, "");
  const clipId = `sh-emblem-${uid}`;

  return (
    <svg
      className={cn("shrink-0", className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="42" />
        </clipPath>
      </defs>
      <circle cx="50" cy="50" r="46" fill={bg} stroke={ring} strokeWidth="2" />
      <g clipPath={`url(#${clipId})`}>
        <text
          x="50"
          y="64"
          textAnchor="middle"
          fill={fg}
          style={{
            fontSize: "34px",
            fontWeight: 800,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
            letterSpacing: "-0.05em",
          }}
        >
          SH
        </text>
      </g>
    </svg>
  );
}

export function Logo({
  className,
  variant = "dark",
  layout = "inline",
}: {
  className?: string;
  variant?: "dark" | "light";
  /** `stack` = emblem above wordmark; `inline` = emblem left (header) */
  layout?: "stack" | "inline";
}) {
  const isOnDark = variant === "light";

  const emblemBg = isOnDark ? "#3d2c2e" : "#2d2424";
  const emblemRing = isOnDark ? "#e8d5cf" : "#c4a4a8";
  const emblemFg = "#fdf8f6";
  const wordClass = isOnDark ? "text-white" : "text-matte";

  const sublineClass = isOnDark ? "text-white/70" : "text-muted";

  const wordmark = (
    <span
      className={cn(
        "font-bold uppercase leading-tight tracking-[0.12em]",
        layout === "stack"
          ? "text-center text-[0.6rem] sm:text-[0.65rem]"
          : "text-left text-[0.52rem] sm:text-[0.58rem]",
        wordClass,
      )}
    >
      <span className="block">Sensational</span>
      <span
        className={cn(
          "mt-0.5 block text-[0.95em] font-semibold tracking-[0.22em]",
          sublineClass,
        )}
      >
        Hair · GH
      </span>
    </span>
  );

  return (
    <span
      className={cn(
        "inline-flex gap-2",
        layout === "stack" ? "flex-col items-center" : "flex-row items-center",
        className,
      )}
    >
      <ShEmblem
        className={cn(
          layout === "stack"
            ? "h-12 w-12 sm:h-14 sm:w-14"
            : "h-9 w-9 sm:h-10 sm:w-10",
        )}
        bg={emblemBg}
        fg={emblemFg}
        ring={emblemRing}
      />
      {wordmark}
    </span>
  );
}
