import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SpineLine.css";

gsap.registerPlugin(ScrollTrigger);

const VERTEBRAE_COUNT = 33;

export default function SpineBlocks() {
  const groupRef = useRef(null);
  const vertebraRefs = useRef([]);

  useEffect(() => {
    const group = groupRef.current;
    const vertebrae = vertebraRefs.current;

    
    gsap.to(group, {
      scrollTrigger: {
        trigger: ".main-page",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      rotation: 8,
      x: 10,
      transformOrigin: "50% 50%",
    });

    // Разлёт позвонков
    gsap.to(vertebrae, {
      scrollTrigger: {
        trigger: ".main-page",
        start: "10% top",
        end: "90% bottom",
        scrub: true,
      },
      y: (i) => -200 + i * 12,
      x: (i) => Math.sin(i * 0.3) * 20,
      stagger: 0.03,
    });

  }, []);

  return (
    <div className="spine-blocks-container">
      <svg width="260" height="900" viewBox="0 0 260 900">
        <g ref={groupRef} transform="translate(130, 40)">
          {Array.from({ length: VERTEBRAE_COUNT }).map((_, i) => {
            const y = i * 26;

            return (
              <g
                key={i}
                ref={(el) => (vertebraRefs.current[i] = el)}
                transform={`translate(0, ${y})`}
                className="vertebra"
              >
                {/* Тело позвонка — большое, заметное */}
                <rect
                  x={-60}
                  y={-12}
                  width={120}
                  height={24}
                  rx={8}
                  fill="#ffffff"
                />

                {/* Боковые отростки — крупные */}
                <rect
                  x={-85}
                  y={-8}
                  width={20}
                  height={16}
                  rx={8}
                  fill="#ffffff"
                  opacity="0.9"
                />
                <rect
                  x={65}
                  y={-8}
                  width={20}
                  height={16}
                  rx={8}
                  fill="#ffffff"
                  opacity="0.9"
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
