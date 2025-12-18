// src/components/EventCard.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Event } from '../types/event';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const availablePercentage = event.totalSeats > 0 
    ? (event.availableSeats / event.totalSeats) * 100 
    : 0;
  
  const getAvailabilityColor = () => {
    if (availablePercentage > 50) return 'text-green-400';
    if (availablePercentage > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8, scale: 1.02, rotateY: 5 }}
      className="group relative bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300"
    >
      {/* Image Container with Overlay */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img 
          src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800'} 
          alt={event.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Price Badge with animation */}
        <motion.div 
          className="absolute top-4 right-4 z-20"
          whileHover={{ scale: 1.1, rotate: 10 }}
        >
          <div className="bg-linear-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm">
            <span className="text-lg font-bold">₹{Number(event.price || 0).toFixed(0)}</span>
          </div>
        </motion.div>
        
        {/* Status Badge */}
        {event.availableSeats === 0 && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-red-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
              SOLD OUT
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {event.title}
        </h3>
        
        {/* Location and Date with stagger */}
        <motion.div 
          className="space-y-2 mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div 
            className="flex items-center text-gray-400 text-sm"
            variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
          >
            <svg className="w-4 h-4 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{event.location}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center text-gray-400 text-sm"
            variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
          >
            <svg className="w-4 h-4 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(event.date).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</span>
          </motion.div>
        </motion.div>

        {/* Availability Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-400">Availability</span>
            <span className={`font-semibold ${getAvailabilityColor()}`}>
              {event.availableSeats} / {event.totalSeats}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 rounded-full ${
                availablePercentage > 50 
                  ? 'bg-linear-to-r from-green-500 to-green-400' 
                  : availablePercentage > 20 
                  ? 'bg-linear-to-r from-yellow-500 to-yellow-400' 
                  : 'bg-linear-to-r from-red-500 to-red-400'
              }`}
              style={{ width: `${availablePercentage}%` }}
            />
          </div>
        </div>

        {/* View Details Button with enhanced animation */}
        <Link 
          to={`/events/${event.id}`}
          className="block w-full"
        >
          <motion.button 
            className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/50 group-hover:scale-105"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            View Details
            <svg className="inline-block w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
