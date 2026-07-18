'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Calendar, Clock, Image, Truck, DollarSign, Music, RefreshCw } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book a session?',
    answer: 'Simply reach out via the contact form, email, or WhatsApp. We\'ll discuss your vision, requirements, and schedule a consultation to plan the perfect shoot.',
    icon: Calendar,
  },
  {
    question: 'What is your availability?',
    answer: 'We operate year-round, with flexible scheduling. Weekends tend to fill up quickly, especially during peak seasons, so early booking is recommended.',
    icon: Clock,
  },
  {
    question: 'Do you offer photo editing services?',
    answer: 'Absolutely. Every image is professionally color-graded and retouched to ensure stunning results. We offer multiple rounds of revisions to meet your expectations.',
    icon: Image,
  },
  {
    question: 'What are your pricing packages?',
    answer: 'We offer tailored packages based on the type of shoot, duration, and deliverables. Contact us for a custom quote designed to fit your needs and budget.',
    icon: DollarSign,
  },
  {
    question: 'Can you cover events and live shows?',
    answer: 'Yes! Events are one of our specialties. From intimate gatherings to large-scale productions, we capture every moment with cinematic precision.',
    icon: Music,
  },
  {
    question: 'Do you travel for shoots?',
    answer: 'We\'re available for local, national, and international projects. Travel expenses may apply depending on location — let\'s discuss the details.',
    icon: Truck,
  },
  {
    question: 'Can I request revisions?',
    answer: 'Absolutely. Your satisfaction is our priority. Each package includes a set number of revisions, and additional edits can always be arranged.',
    icon: RefreshCw,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-32 px-4 md:px-8 lg:px-16 bg-[#2A281B]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs tracking-[0.3em] text-[#EF7373] uppercase mb-4">FAQ</p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#E4DBC2]"
            style={{ fontFamily: 'Barlow, sans-serif' }}
          >
            Frequently Asked
            <br />
            <span className="text-[#E4DBC2]">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={`w-full flex items-center gap-4 p-5 md:p-6 rounded-2xl text-left transition-all duration-300 ${
                    isOpen
                      ? 'bg-[#2E2E46]/40 border border-[#EF7373]/20'
                      : 'bg-[#2A281B]/50 border border-[#E4DBC2]/10 hover:border-[#E4DBC2]/20'
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isOpen ? 'bg-[#EF7373]/20' : 'bg-[#E4DBC2]/5'
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors ${
                      isOpen ? 'text-[#EF7373]' : 'text-[#E4DBC2]/40'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm md:text-base font-semibold transition-colors ${
                      isOpen ? 'text-[#E4DBC2]' : 'text-[#E4DBC2]/70'
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isOpen ? 'bg-[#EF7373]/20 rotate-45' : 'bg-[#E4DBC2]/5'
                  }`}>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-[#EF7373]" />
                    ) : (
                      <Plus className="w-4 h-4 text-[#E4DBC2]/40" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 py-4 md:px-6 md:py-5 ml-14">
                        <p className="text-sm text-[#E4DBC2]/50 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}