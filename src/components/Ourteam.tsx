import  type {  JSX } from "react";
import { motion } from "framer-motion";

const SPEAKERS = [
  {
    id: 1,
    name: "Alex Rivera",
    title: "Lead Software Engineer",
    color: "bg-[#A8DADC]", // pastel teal
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sophia Chen",
    title: "UX/UI Designer",
    color: "bg-[#F4A261]", // pastel orange
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop%27",
  },
  {
    id: 3,
    name: "Liam Patel",
    title: "Data Analyst",
    color: "bg-[#E9C46A]", // pastel gold
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Emma Thompson",
    title: "Project Manager",
    color: "bg-[#D4A574]", // pastel brown
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Jordan Lee",
    title: "Marketing Specialist",
    color: "bg-[#B5838D]", // pastel rose
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotate: 15, scale: 0.8 },
  visible: (i = 1) => ({ 
    opacity: 1, 
    y: 0, 
    rotate: 0,
    scale: 1,
    transition: { 
      delay: 0.1 * i,
      duration: 0.8,
      type: "spring" as const,
      bounce: 0.4
    } 
  }),
};

export default function SpeakersPage(): JSX.Element {
  return (
    <div className="min-h-screen  rounded-t-[64px] rounded-b-[64px] overflow-hidden bg-linear-to-br from-purple-600 to-purple-500 text-white">
      {/* HERO */}
      <header className="relative overflow-hidden pb-20">
        {/* purple rounded background + subtlwave svg */}
        <div className="relative z-0">
          <div className="absolute "></div>
          {/* decorative translucent waves using SVG */}
          <motion.svg
            viewBox="0 0 1200 300"
            className="absolute inset-x-0 -bottom-10 w-full h-[220px] opacity-20"
            preserveAspectRatio="none"
            animate={{ 
              d: [
                "M0,200 C200,260 400,120 600,140 C800,160 1000,260 1200,200 L1200,300 L0,300 Z",
                "M0,220 C200,180 400,280 600,200 C800,120 1000,180 1200,220 L1200,300 L0,300 Z",
                "M0,200 C200,260 400,120 600,140 C800,160 1000,260 1200,200 L1200,300 L0,300 Z"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.path
              fill="#7C3AED"
              animate={{ 
                d: [
                  "M0,200 C200,260 400,120 600,140 C800,160 1000,260 1200,200 L1200,300 L0,300 Z",
                  "M0,220 C200,180 400,280 600,200 C800,120 1000,180 1200,220 L1200,300 L0,300 Z",
                  "M0,200 C200,260 400,120 600,140 C800,160 1000,260 1200,200 L1200,300 L0,300 Z"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>

          <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32">
            <motion.h1
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
              whileHover={{ scale: 1.05, color: "#FFD700" }}
              className="text-center text-[44px] md:text-[86px] leading-tight font-medium tracking-tight text-yellow-200"
            >
              Meet Our Dedicated <br className="hidden md:inline" /> Team
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.4 }}
              className="mt-6 text-center max-w-2xl mx-auto text-white text-base md:text-lg"
            >
              Discover the talented individuals 
              <span className="text-gray-200/80"> driving our mission forward with innovation and expertise.</span>  
            </motion.p>
          </div>
        </div>
      </header>

      {/* SPEAKERS GRID */}
      <main className="max-w-7xl mx-auto px-6 pb-28">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* map speakers into cards */}
          {SPEAKERS.map((s, idx) => (
            <motion.article
              key={s.id}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ rotate: -5, scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              className="rounded-2xl overflow-hidden bg-transparent"
            >
              {/* image panel with colored background */}
              <div
                className={`rounded-2xl overflow-hidden ${s.color} aspect-4/5 md:aspect-3/4 flex items-start justify-center`}
              >
                {/* center-cropped image */}
                <img
                  src={s.image}
                  alt={s.name}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* card footer with name/title (purple background extension) */}
              <div className="mt-4  rounded-b-2xl px-6 py-6">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {s.name}
                </h3>
                <p className="text-sm text-white/80 mt-2">{s.title}</p>
              </div>
            </motion.article>
          ))}

          {/* BUY TICKET CTA card - visually matches your reference */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden "
          >
            <div className=" rounded-2xl bg-[#8a46e6]/80 mt-15 flex items-center justify-center aspect-4/5 md:aspect-auto md:min-h-[420px]">
              <div className="text-center px-6">
                <h3 className="text-3xl md:text-4xl font-semibold text-white">
                  Join Our Team
                </h3>
                <p className="mt-3 text-sm text-white/80">Explore opportunities</p>
                <button
                  className="mt-6 inline-block rounded-full bg-white text-purple-600 font-semibold px-7 py-3 shadow-lg hover:scale-[1.02] transition-transform"
                  onClick={() => alert("Open careers page")}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
