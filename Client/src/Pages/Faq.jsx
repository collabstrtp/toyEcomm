import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import gifSrc from "../assets/toychild.gif";

const FAQItem = ({
  question,
  answer,
  isOpen,
  toggleOpen,
  isAnyOpen,
  index,
}) => {
  // Only rotate specific indices (1, 3, 5, 7)
  const shouldRotate = [0, 1, 3].includes(index);
  const rotation = shouldRotate
    ? (index % 2 === 0 ? -1 : 1) * (1.8 + index * 0.8)
    : 0;

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl"
      style={{
        marginLeft: isAnyOpen
          ? "0px"
          : shouldRotate
          ? `${(index % 3) * 25}px`
          : "0px",
        width: isAnyOpen
          ? "100%"
          : shouldRotate
          ? `calc(100% - ${(index % 3) * 25}px)`
          : "100%",
        transform: isAnyOpen ? "rotate(0deg)" : `rotate(${rotation}deg)`,
      }}
    >
      <button
        className="flex justify-between items-center w-full p-5 text-left text-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-purple-600 transition-transform duration-300 flex shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-5 pb-5 text-gray-600 border-t border-gray-200">
          <p className="mt-3">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What age groups are your toys suitable for?",
      answer:
        "We offer toys for all age groups, from newborns to teenagers. Each product listing includes recommended age ranges to help you find the perfect toy for your child's developmental stage.",
    },
    {
      question: "Do you offer free shipping?",
      answer:
        "Yes! We offer free standard shipping on all orders over $50. For orders under $50, a flat shipping fee of $5.99 applies. Express shipping options are also available at checkout.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Items must be unused and in their original packaging. Simply contact our customer service team to initiate a return.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for your convenience.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard shipping typically takes 5-7 business days. Express shipping delivers within 2-3 business days. Orders are processed within 24 hours on business days.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const isAnyOpen = openIndex !== null;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: FAQ Items with Staggered Layout */}
          <div className="lg:order-1 order-2">
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-12">
              FAQ
            </h2>

            {/* Staggered/Straight FAQ Items */}
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  toggleOpen={() => toggleFAQ(index)}
                  isAnyOpen={isAnyOpen}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Laptop/Screen Mockup */}
          <div className="lg:order-2 order-1 flex justify-center items-center">
            {/* Laptop Frame */}
            <div className="relative flex justify-center items-center lg:order-2 order-1 min-h-[300px] lg:min-h-[500px]  p-4">
              {gifSrc ? (
                <img
                  src={gifSrc}
                  alt="Related GIF"
                  className="max-w-full h-auto rounded-lg"
                  style={{ maxHeight: "100%", objectFit: "contain" }}
                />
              ) : (
                <div className="text-gray-500 text-center">
                  Please provide a GIF source via the `gifSrc` prop.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
