import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {  Star } from 'lucide-react';
import AnimatedTicketButton from './BuyticketBtn';
import TinyShootingStars from "../components/TinyShootingStars";

const PricingSection: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  // Parallax effect: background moves slower (less distance)
  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // Cards move faster (more distance)
  const cardsY = useTransform(scrollYProgress, [0, 1], [150, -50]);
  
  const blurBasic = useTransform(scrollYProgress, [0, 0.5, 1], [20, 5, 0]);
  const blurPremium = useTransform(scrollYProgress, [0, 0.5, 1], [20, 5, 0]);
  const opacityBasic = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1]);
  const opacityPremium = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.7, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.95, 1]);

const basicFeatures = [
  'Live seat availability updates',
  'Instant booking confirmation',
  'Secure and encrypted payment processing',
  'Digital e-ticket delivery via email',
  'QR-based fast and contactless check-in',
  '24/7 dedicated customer support'
];


const premiumFeatures = [
  'All Basic features included',
  'Priority seat selection for top views',
  'Early access to upcoming events',
  'Members-only discounts and special offers',
  'Full-featured mobile app access',
  'Detailed booking history and insights',
];


  return (
    <div className="min-h-screen overflow-hidden  border-2 rounded-[40px] bg-black">
      <TinyShootingStars/>
      <div ref={ref} className="relative min-h-screen bg-black overflow-hidden">
        {/* Background decoration with slower parallax */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-700 rounded-full blur-3xl" />
        </motion.div>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center pt-20 pb-16 px-8"
        >
          <h1 className="text-5xl md:text-7xl font-medium text-yellow-200 mb-6">
            Event Booking Benefits
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            Experience seamless event booking with <span className="text-white/60">real-time seat availability,</span>
            <br />
            <span className="text-white/60">instant confirmations, and secure payment processing.</span>
          </p>
        </motion.div>

        {/* Pricing Cards with faster parallax */}
        <motion.div 
          style={{ y: cardsY }}
          className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-2 md:px-16 pb-32 mx-auto"
        >
          {/* Basic Card */}
          <motion.div
            style={{ 
              filter: useTransform(blurBasic, (val) => `blur(${val}px)`),
              opacity: opacityBasic,
              scale: scale
            }}
            className="relative bg-purple-700/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-purple-400/30 rounded-full text-white text-lg mb-6">
                Standard User
              </span>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-7xl md:text-8xl font-medium text-yellow-200">Free</span>
              </div>
              <p className="text-white/70 text-lg mb-8">
                Perfect for casual event-goers. <span className="text-white/50">Get access to all essential booking features with no subscription fees.</span>
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {basicFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Star className="w-6 h-6 text-yellow-400 shrink-0" />
                  <span className="text-white text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>

            <AnimatedTicketButton />
          </motion.div>

          {/* Premium Card */}
          <motion.div
            style={{ 
              filter: useTransform(blurPremium, (val) => `blur(${val}px)`),
              opacity: opacityPremium,
              scale: scale
            }}
            className="relative bg-purple-700/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
          >
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-purple-400/30 rounded-full text-white text-lg mb-6">
                Premium Member
              </span>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-7xl md:text-8xl font-medium text-yellow-200">₹999</span>
                <span className="text-white/60 text-xl">/month</span>
              </div>
              <p className="text-white/70 text-lg mb-8">
                For frequent event attendees. <span className="text-white/50">Unlock exclusive perks, discounts, and priority access to hottest events.</span>
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {premiumFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Star className="w-6 h-6 text-yellow-400 shrink-0" />
                  <span className="text-white text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>

            <AnimatedTicketButton />
          </motion.div>
        </motion.div>
      </div>
    </div> 
  );
};

export default PricingSection;