// CurvyDiagonalRibbons.tsx
import React from "react";

interface CurvyDiagonalRibbonsProps {
  color?: string;
  opacity?: number;
  duration?: number; // seconds
  delayStep?: number; // stagger between ribbons
}

const CurvyDiagonalRibbons: React.FC<CurvyDiagonalRibbonsProps> = ({
  color = "#ffffff",
  opacity = 0.18,
  duration = 10,
  delayStep = 0.6,
}) => {
  const ribbons = [0, 1, 2]; // 2–3 ribbons

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <svg
        width="170%"
        height="170%"
        viewBox="0 0 1700 900"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: "-35%",
          bottom: "-45%",
        }}
      >
        {ribbons.map((i) => (
          <path
            key={i}
            className="curvy-diagonal-ribbon"
            style={{
              animationDelay: `${i * delayStep}s`,
            }}
            d="
              M 0 720
              C 260 680 380 580 640 540
              C 900 500 1100 440 1400 360
              C 1550 320 1650 260 1700 210
            "
            fill="none"
            stroke={color}
            strokeWidth={46 - i * 8} // slightly thinner each ribbon
            strokeLinecap="round"
            opacity={0} // start invisible, animation reveals it
          />
        ))}
      </svg>

      <style>
        {`
        .curvy-diagonal-ribbon {
          /* start off-screen bottom-left + transparent */
          transform-origin: 0% 100%;
          animation-name: curvy-diagonal-once;
          animation-duration: ${duration}s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards; /* keep final state */
        }

        @keyframes curvy-diagonal-once {
          0% {
            transform: translate(-20%, 18%) scale(1.05);
            opacity: 0;
          }
          25% {
            opacity: ${opacity};
          }
          100% {
            transform: translate(20%, -20%) scale(1.05);
            opacity: ${opacity};
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .curvy-diagonal-ribbon {
            animation: none !important;
            opacity: ${opacity};
            transform: translate(10%, -8%) scale(1.05);
          }
        }
      `}
      </style>
    </div>
  );
};

export default CurvyDiagonalRibbons;
