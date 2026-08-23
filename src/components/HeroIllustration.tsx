"use client";

import { motion } from "framer-motion";

const IsometricCube = ({ x, y, delay }: { x: number; y: number; delay: number }) => {
  // Isometric dimensions
  const dx = 40;
  const dy = 23;
  const h = 46;

  // Polygons for top, left, and right faces
  const top = `0,-${dy} ${dx},0 0,${dy} -${dx},0`;
  const left = `-${dx},0 0,${dy} 0,${dy + h} -${dx},${h}`;
  const right = `0,${dy} ${dx},0 ${dx},${h} 0,${dy + h}`;

  return (
    <motion.g
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
      transform={`translate(${x}, ${y})`}
      className="group cursor-pointer"
    >
      <polygon
        points={top}
        className="fill-[#111111] stroke-purple-500/60 stroke-[1px] group-hover:fill-purple-900/30 group-hover:stroke-purple-400 transition-all duration-300"
      />
      <polygon
        points={left}
        className="fill-[#0c0c0c] stroke-purple-500/60 stroke-[1px] group-hover:fill-purple-900/40 group-hover:stroke-purple-400 transition-all duration-300"
      />
      <polygon
        points={right}
        className="fill-[#080808] stroke-purple-500/60 stroke-[1px] group-hover:fill-purple-900/20 group-hover:stroke-purple-400 transition-all duration-300"
      />
      {/* Glowing nodes on corners */}
      <circle cx="0" cy={-dy} r="1.5" className="fill-purple-400" />
      <circle cx={dx} cy="0" r="1.5" className="fill-purple-400" />
      <circle cx={-dx} cy="0" r="1.5" className="fill-purple-400" />
      <circle cx="0" cy={dy} r="1.5" className="fill-purple-400" />
      <circle cx={dx} cy={h} r="1.5" className="fill-purple-400" />
      <circle cx={-dx} cy={h} r="1.5" className="fill-purple-400" />
      <circle cx="0" cy={dy + h} r="1.5" className="fill-purple-400" />
    </motion.g>
  );
};

export default function HeroIllustration() {
  // Grid layout for cubes (x, y offsets)
  const dx = 40;
  const dy = 23;
  
  // Cluster similar to reference
  const cubes = [
    { id: 1, x: 0, y: 0, delay: 0.2 },
    { id: 2, x: dx, y: dy, delay: 0.3 },
    { id: 3, x: dx * 2, y: dy * 2, delay: 0.4 },
    { id: 4, x: -dx, y: dy, delay: 0.3 },
    { id: 5, x: -dx * 2, y: dy * 2, delay: 0.4 },
    { id: 6, x: 0, y: dy * 2, delay: 0.5 },
    { id: 7, x: dx, y: dy * 3, delay: 0.6 },
    { id: 8, x: -dx, y: dy * 3, delay: 0.6 },
    { id: 9, x: 0, y: dy * 4, delay: 0.7 },
  ];

  return (
    <div className="relative w-full h-[300px] lg:h-[400px] flex items-center justify-center">
      <div className="absolute inset-0 bg-purple-600/10 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
      <svg 
        viewBox="-160 -80 320 280" 
        className="w-full h-full max-w-[500px] drop-shadow-2xl overflow-visible relative z-10"
      >
        {cubes.map((cube) => (
          <IsometricCube key={cube.id} x={cube.x} y={cube.y} delay={cube.delay} />
        ))}
      </svg>
    </div>
  );
}
