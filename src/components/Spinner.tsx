import React from "react";

// ─── CSS Keyframes (injected once) ───────────────────────
const spinnerStyles = `
@keyframes ql-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes ql-ring-dash {
  0%   { stroke-dasharray: 1 200; stroke-dashoffset: 0; }
  50%  { stroke-dasharray: 80 200; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 80 200; stroke-dashoffset: -124; }
}
@keyframes ql-dot-pulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40%           { transform: scale(1); opacity: 1; }
}
@keyframes ql-bar-bounce {
  0%, 100% { transform: scaleY(0.5); opacity: 0.4; }
  50%      { transform: scaleY(1); opacity: 1; }
}
@keyframes ql-status-fade {
  0%, 100% { opacity: 0.5; }
  50%      { opacity: 1; }
}
@keyframes ql-progress-fill {
  0%   { stroke-dashoffset: 126; }
  50%  { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -126; }
}
@keyframes ql-ticket-pulse {
  0%, 100% { border-color: #99f6e4; transform: scale(0.9); }
  50%      { border-color: #14b8a6; transform: scale(1); }
}
@keyframes ql-ticket-text-pulse {
  0%, 100% { color: #99f6e4; }
  50%      { color: #14b8a6; }
}

@media (prefers-reduced-motion: reduce) {
  .ql-spinner-ring,
  .ql-spinner-ring .ql-arc,
  .ql-spinner-dots .ql-dot,
  .ql-spinner-bars .ql-bar,
  .ql-spinner-progress,
  .ql-spinner-progress .ql-fill,
  .ql-btn-spinner,
  .ql-ticket-shape,
  .ql-status-text {
    animation: none !important;
  }
}
`;

// Inject styles once
let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  const style = document.createElement("style");
  style.textContent = spinnerStyles;
  document.head.appendChild(style);
  stylesInjected = true;
}

// ─── 1. Ring Spinner (Primary) ───────────────────────────
interface SpinnerProps {
  size?: number;
  className?: string;
}

export function Spinner({ size = 48, className = "" }: SpinnerProps) {
  React.useEffect(() => { injectStyles(); }, []);

  return (
    <svg
      className={`ql-spinner-ring ${className}`}
      width={size}
      height={size}
      viewBox="0 0 50 50"
      style={{ animation: "ql-spin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
    >
      <circle
        className="ql-track"
        cx="25" cy="25" r="20"
        fill="none"
        stroke="#ccfbf1"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        className="ql-arc"
        cx="25" cy="25" r="20"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="80 200"
        strokeDashoffset="0"
        style={{ animation: "ql-ring-dash 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
      />
    </svg>
  );
}

// ─── 2. Button Spinner (Inline, small) ───────────────────
interface ButtonSpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ButtonSpinner({ size = 20, color = "#ffffff", className = "" }: ButtonSpinnerProps) {
  React.useEffect(() => { injectStyles(); }, []);

  return (
    <svg
      className={`ql-btn-spinner ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ animation: "ql-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
    >
      <circle
        cx="12" cy="12" r="10"
        fill="none"
        stroke={color === "#ffffff" ? "rgba(255,255,255,0.3)" : "rgba(20,184,166,0.2)"}
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── 3. Queue Dots ───────────────────────────────────────
interface QueueDotsProps {
  size?: number;
  className?: string;
}

export function QueueDots({ size = 12, className = "" }: QueueDotsProps) {
  React.useEffect(() => { injectStyles(); }, []);

  return (
    <div className={`ql-spinner-dots ${className}`} style={{ display: "flex", alignItems: "center", gap: "8px", height: "48px" }}>
      {[0, 150, 300].map((delay, i) => (
        <div
          key={i}
          className="ql-dot"
          style={{
            width: size,
            height: size,
            borderRadius: "9999px",
            background: "#14b8a6",
            animation: `ql-dot-pulse 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            animationDelay: `${delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

// ─── 4. Queue Bars ───────────────────────────────────────
interface QueueBarsProps {
  className?: string;
}

export function QueueBars({ className = "" }: QueueBarsProps) {
  React.useEffect(() => { injectStyles(); }, []);

  return (
    <div className={`ql-spinner-bars ${className}`} style={{ display: "flex", alignItems: "center", gap: "4px", height: "48px" }}>
      {[0, 100, 200, 300].map((delay, i) => (
        <div
          key={i}
          className="ql-bar"
          style={{
            width: 6,
            height: 24,
            borderRadius: "9999px",
            background: "#14b8a6",
            animation: `ql-bar-bounce 1s cubic-bezier(0.34, 1.56, 0.64, 1) infinite`,
            animationDelay: `${delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

// ─── 5. Page Loader (Full-page branded spinner) ──────────
interface PageLoaderProps {
  message?: string;
  className?: string;
}

export function PageLoader({ message = "Loading your queue...", className = "" }: PageLoaderProps) {
  React.useEffect(() => { injectStyles(); }, []);

  return (
    <div
      className={`${className}`}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        background: "#fafaf9",
      }}
    >
      <div style={{
        fontSize: "22px",
        fontWeight: 700,
        color: "#14b8a6",
        letterSpacing: "-0.005em",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        QueueLess
      </div>
      <Spinner size={48} />
      <div
        className="ql-status-text"
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#a8a29e",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          animation: "ql-status-fade 2s ease-in-out infinite",
        }}
      >
        {message}
      </div>
    </div>
  );
}

// ─── 6. Skeleton Shimmer ─────────────────────────────────
interface SkeletonProps {
  lines?: number;
  className?: string;
}

export function Skeleton({ lines = 3, className = "" }: SkeletonProps) {
  const widths = ["75%", "50%", "100%", "60%", "90%"];
  const heights = [20, 16, 16, 14, 14];

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{
            height: heights[i % heights.length],
            width: widths[i % widths.length],
            borderRadius: "8px",
            background: "linear-gradient(90deg, #f5f5f4 25%, #e7e5e4 50%, #f5f5f4 75%)",
            backgroundSize: "200% 100%",
            animation: "ql-shimmer 1.5s ease-in-out infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes ql-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
