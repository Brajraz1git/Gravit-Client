// PeopleCards.tsx
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import img1 from "../assets/member-1.png";
import img2 from "../assets/member-2.png";
import img3 from "../assets/member-3.png";
import img4 from "../assets/member-4.png";


type Member = {
  id: number;
  name: string;
  title: string;
  bg: string;
  imageUrl: string;
};

const members: Member[] = [
  {
    id: 0,
    name: "Riyah Shetty",
    title: "Chief Data Scientist",
    bg: "linear-gradient(135deg,#ffb25c,#ff7f5c)", // orange
    imageUrl: img1,
  },
  {
    id: 1,
    name: "Brajraz Mishra",
    title: "Head of Cloud Engineering",
    bg: "linear-gradient(135deg,#4ca5ff,#4fd1ff)", // blue
    imageUrl: img2,
  },
  {
    id: 2,
    name: "Shweta Sharma",
    title: "Founder & CTO, DevSync",
    bg: "linear-gradient(135deg,#ff7cf0,#c474ff)", // purple-pink
    imageUrl: img3,
  },
  {
    id: 3,
    name: "Mohd. Faiz",
    title: "Lead Product Designer",
    bg: "linear-gradient(135deg,#ff8b7f,#ff6d6d)", // coral
    imageUrl: img4,
  },
];

const PeopleCards: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef }); // Local to section

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen md:min-h-[140vh] overflow-hidden font-sans"
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
      }}
    >
      {/* Top gradient background */}
      <div
        className="absolute inset-0 z-0 rounded-xl"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, #ff9cf5 0, transparent 55%), radial-gradient(circle at 100% 0%, #4da6ff 0, transparent 55%), linear-gradient(180deg,#6a3df5 0,#2a115f 40%,#050315 100%)",
        }}
      />

      {/* Lower band background – width constrained */}
      <div
        className="absolute left-4 right-4 md:left-16 md:right-16 bottom-0 h-32 md:h-48 rounded-t-3xl overflow-hidden z-10"
        style={{
          background:
            "linear-gradient(90deg,rgba(255,255,255,0.15),rgba(255,255,255,0.05))",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />

      {/* Cards row */}
      <div
        className="relative z-20 flex flex-wrap justify-center items-end gap-2 md:gap-4 p-2 md:p-24 md:pb-48"
      >
        {members.map((m, index) => {
          // Alternate vertical offset directions (zig-zag)
          const direction = index % 2 === 0 ? 1 : -1;
          // Card moves up/down while within main gradient area,
          // then comes back to level (0) as scroll approaches bottom.
          const y = useTransform(
            scrollYProgress,
            [0, 0.15, 0.6, 1],
            [0, 0, 80 * direction, 0]
          );

          const shadow = useTransform(
            scrollYProgress,
            [0, 0.15, 0.6, 1],
            [
              "0 24px 60px rgba(0,0,0,0.35)", // initial
              "0 24px 60px rgba(0,0,0,0.35)", // still straight
              "0 32px 100px rgba(0,0,0,0.55)", // mid zig-zag
              "0 18px 40px rgba(0,0,0,0.35)",  // leveled again
            ]
          );

          return (
            <motion.article
              key={m.id}
              className="w-full sm:w-1/2 md:w-64 lg:w-80 rounded-3xl overflow-hidden flex flex-col justify-between"
              style={{
                y,
                boxShadow: shadow,
                background: m.bg,
                transformOrigin: "center bottom",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Image area – drop in your own images */}
              <div
                className="p-4 md:p-6 pb-4 flex justify-center items-end h-64 md:h-80"
              >
                <div
                  className="w-full h-full rounded-3xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${m.imageUrl})`,
                  }}
                />
              </div>

              {/* Name & title on dark glass strip */}
              <div
                className="p-4 md:p-5 pb-4 text-white"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0.85))",
                }}
              >
                <p
                  className="text-lg md:text-xl font-semibold tracking-wide mb-1"
                >
                  {m.name}
                </p>
                <p
                  className="text-sm md:text-base opacity-85 leading-relaxed"
                >
                  {m.title}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default PeopleCards;
