import React from 'react';
import { motion } from 'framer-motion';


const SummitraFooter: React.FC = () => {
  const footerLinks = [
    { label: 'Browse Events', href: '/events' },
    { label: 'My Bookings', href: '/dashboard' },
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Help Center', href: '#' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className='bg-black'> 
      <motion.footer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative  border-0 rounded-t-[40px] md:rounded-t-[64px]  bg-linear-to-br from-purple-800 via-purple-700 to-purple-900 px-8 py-16 md:px-16 lg:px-24"
      >
        {/* Background decoration with-purple theme */}
        <div className="absolute inset-0 bg-black opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 bg-black rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-black rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Main Content Section with enhanced animations */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="max-w-md">
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                whileHover={{ scale: 1.05, textShadow: "0px 0px 10px rgba(0,0,0, 0.8)" }}
              >
               
                Summitra
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-purple-100 text-base md:text-lg leading-relaxed"
              >
                Turn moments into memories. <br/> Explore concerts, conferences, and curated events <br/> All made easy through secure and seamless booking.
              </motion.p>
            </motion.div>

            {/* Right Content */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-start lg:items-end gap-6"
            >

              <motion.div
                variants={itemVariants}
                className="text-right"
              >
                <motion.h3
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-purple-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ textShadow: "0px 0px 15px rgba(0,0,0,0.8)" }}
                >
                  Real-Time Event
                  <br />
                  Booking Platform
                </motion.h3>
              </motion.div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="h-px bg-white/20 mb-8"
          />

          {/* Bottom Navigation with stagger and hover effects */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            {/* Links */}
            <motion.nav className="flex flex-wrap gap-6 md:gap-8">
              {footerLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  variants={linkVariants}
                  whileHover={{ scale: 1.1, rotate: 2, color: '#D8B4FE' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white text-base md:text-lg font-medium transition-colors duration-200 hover:text-cyan-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.nav>

            {/* Credit */}
            <motion.p
              variants={itemVariants}
              className="text-purple-200 text-sm md:text-base"
            >
              © 2025 Summitra Events - All Rights Reserved
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>

    </div>
  );
};

export default SummitraFooter;