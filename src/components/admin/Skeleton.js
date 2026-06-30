import React from "react";

export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="w-full space-y-3.5 animate-pulse">
      {/* Header skeleton */}
      <div className="h-10 bg-primary/10 border-b border-accent/15" />
      {/* Body rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 py-3 border-b border-primary/5">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-6 bg-primary/5 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="border border-accent/20 bg-bg-warm/60 p-6 flex flex-col gap-4 animate-pulse">
      <div className="h-4 bg-primary/10 rounded w-1/3" />
      <div className="h-8 bg-primary/15 rounded w-1/2" />
      <div className="h-4 bg-primary/5 rounded w-3/4" />
    </div>
  );
}

export function ImageGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-square bg-primary/5 border border-accent/10 flex flex-col" />
      ))}
    </div>
  );
}
