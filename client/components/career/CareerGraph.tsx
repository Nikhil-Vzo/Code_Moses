import { motion } from "framer-motion";
import { useMemo } from "react";
import type { StreamKey } from "@/data/quiz";

export type Node = { id: string; label: string; score: number; color: string };

function polarToCartesian(r: number, angle: number) {
  return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

export default function CareerGraph({
  scores,
}: {
  scores: Record<StreamKey, number>;
}) {
  const nodes: Node[] = useMemo(() => {
    const entries: [StreamKey, string][] = [
      ["science", "Science"],
      ["commerce", "Commerce"],
      ["arts", "Arts"],
      ["vocational", "Vocational"],
    ];
    const max = Math.max(1, ...Object.values(scores).map((v) => Math.abs(v)));
    return entries.map(([k, label], i) => ({
      id: k,
      label,
      score: (scores[k] + max) / (2 * max),
      color: ["#7b61ff", "#ff9ad6", "#60a5fa", "#34d399"][i],
    }));
  }, [scores]);

  const radius = 160;

  return (
    <div className="relative mx-auto aspect-square max-w-md">
      <svg viewBox="-200 -200 400 400" className="h-full w-full">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle r={180} fill="url(#grad)" fillOpacity="0.05" stroke="#e6e6f0" />
        {nodes.map((n, idx) => {
          const angle = (idx / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const p = polarToCartesian(radius * n.score, angle);
          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <line
                x1={0}
                y1={0}
                x2={p.x}
                y2={p.y}
                stroke="#d3c7ff"
                strokeDasharray="4 4"
              />
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={18 + 30 * n.score}
                fill={n.color}
                filter="url(#glow)"
                whileHover={{ scale: 1.08 }}
              />
              <text
                x={p.x}
                y={p.y + 4}
                textAnchor="middle"
                className="fill-white text-[10px] font-bold"
              >
                {Math.round(n.score * 100)}%
              </text>
              <text
                x={p.x}
                y={p.y + 28 + 30 * n.score}
                textAnchor="middle"
                className="fill-[#333] text-[10px]"
              >
                {n.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
