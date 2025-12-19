"use client";

import { useEffect, useState } from "react";

type Flake = {
  id: number;
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
};

export function Snowfall() {
  const [flakes, setFlakes] = useState<Flake[]>([]);

  useEffect(() => {
    const flakeCount = 60;
    const list: Flake[] = Array.from({ length: flakeCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.5
    }));
    setFlakes(list);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            opacity: flake.opacity
          }}
        />
      ))}
    </div>
  );
}
