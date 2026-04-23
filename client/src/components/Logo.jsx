import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]"
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Center Brain Node */}
        <motion.circle
          cx="50"
          cy="50"
          r="14"
          fill="url(#grad)"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Outer Nodes */}
        {[
          { cx: 20, cy: 30 },
          { cx: 80, cy: 30 },
          { cx: 20, cy: 70 },
          { cx: 80, cy: 70 },
        ].map((node, index) => (
          <motion.circle
            key={index}
            cx={node.cx}
            cy={node.cy}
            r="7"
            fill="url(#grad)"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
        ))}

        {/* Connecting Lines */}
        {[
          { x1: 50, y1: 50, x2: 20, y2: 30 },
          { x1: 50, y1: 50, x2: 80, y2: 30 },
          { x1: 50, y1: 50, x2: 20, y2: 70 },
          { x1: 50, y1: 50, x2: 80, y2: 70 },
        ].map((line, index) => (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#grad)"
            strokeWidth="3"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </svg>

      <span className="text-white font-semibold text-xl tracking-wide">
       
        Opus-
         <span className="text-indigo-500">
          Mind
          
        </span>
      </span>
    </motion.div>
  );
};

export default Logo;
