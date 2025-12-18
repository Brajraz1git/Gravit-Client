import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import DotFlood from "../components/DotFlood";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  { id: 1, question: "How can I easily book tickets for an upcoming event?", answer: "Booking is straightforward! Head to our Events page, pick your favorite event, specify the number of tickets, and proceed through our secure checkout. You'll get an instant email with all your booking details and digital tickets." },
  { id: 2, question: "What payment options are available for purchases?", answer: "We support a wide range of secure payment methods, including major credit/debit cards, UPI, net banking, and popular digital wallets. Every transaction is encrypted for your safety." },
  { id: 3, question: "Is it possible to purchase multiple tickets in one go?", answer: "Definitely! Select the quantity you need during checkout, and all tickets will be processed together. They'll be conveniently linked in your account for seamless management." },
  { id: 4, question: "How do I discover exciting upcoming events?", answer: "Explore our Events page, where you can browse listings with filters for date, location, category, and price. Each event displays real-time availability and full details to guide your decision." },
  { id: 5, question: "Will my tickets be delivered right away?", answer: "Absolutely—successful payment triggers an immediate email confirmation. Access your tickets in your dashboard as PDFs or QR codes for hassle-free event entry." },
  { id: 6, question: "How does real-time seat availability ensure fairness?", answer: "Our system dynamically updates seat counts as bookings occur. Seats are instantly assigned upon purchase, so you always see accurate availability before confirming." },
  { id: 7, question: "What happens if I need to cancel my booking?", answer: "Cancellation terms depend on the event—most allow full refunds up to 7 days prior. Review the policy on the event page before booking to avoid surprises." },
  { id: 8, question: "What if the event I booked gets cancelled?", answer: "Rest assured, cancellations are rare. If it happens, we'll notify you instantly via email/SMS and process a full refund within 5-7 business days, trackable in your dashboard." },
];

interface FAQCardProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

const FAQCard: React.FC<FAQCardProps> = ({ item, isOpen, onToggle }) => {
  const handleToggle = () => onToggle(item.id);

  return (
    // add `self-start` so each card aligns to the top of the row and won't be vertically centered
    <div
      className="bg-transparent w-full h-fit border max-w-3xl border-white/5 rounded-lg overflow-hidden transition-colors hover:border-white/10 self-start"
    >
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="text-xl font-medium text-white pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0 text-white"
        >
          <Plus size={24} strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`answer-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-400 leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const handleToggle = (id: number) => {
    setOpenIds(prevOpenIds => {
      const newOpenIds = new Set(prevOpenIds);
      if (newOpenIds.has(id)) newOpenIds.delete(id);
      else newOpenIds.add(id);
      return newOpenIds;
    });
  };

  // Stagger variants for grid entrance
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="min-h-screen bg-transparent px-3 py-20 text-white">
      <div className="mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            Frequently Asked <br className="hidden md:block" /> Questions
          </h2>
        </div>

        {/* Change to grid for 2 columns */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqData.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <FAQCard
                item={item}
                isOpen={openIds.has(item.id)}
                onToggle={handleToggle}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
