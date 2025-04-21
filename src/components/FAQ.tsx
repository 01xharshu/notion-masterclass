'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaQuestionCircle, FaClock, FaUserGraduate, FaCertificate, FaMoneyBillWave, FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What will I learn in this course?',
      answer: 'You will learn everything from setting up your YouTube channel to creating engaging content, optimizing videos for better reach, and monetizing your channel effectively.',
      icon: FaQuestionCircle
    },
    {
      question: 'How long will it take to complete the course?',
      answer: 'The course is designed to be completed in 8 weeks, but you can learn at your own pace. Each module takes approximately 2-3 hours to complete.',
      icon: FaClock
    },
    {
      question: 'Do I need any prior experience?',
      answer: 'No prior experience is required. The course is designed for beginners and covers everything from the basics to advanced techniques.',
      icon: FaUserGraduate
    },
    {
      question: 'Will I get a certificate after completion?',
      answer: 'Yes, you will receive a certificate of completion after finishing all the modules and assignments.',
      icon: FaCertificate
    },
    {
      question: 'What is the refund policy?',
      answer: 'We offer a 7-day money-back guarantee if you are not satisfied with the course content.',
      icon: FaMoneyBillWave
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our YouTube course
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <faq.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4 text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                </div>
                <FaChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
