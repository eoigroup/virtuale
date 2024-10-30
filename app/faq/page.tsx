"use client";

import React, { useState } from 'react'; // Make sure to import useState
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page"; 

const faqs = [
  {
    question: "What is your return policy?",
    answer: "You can return any item within 30 days of purchase for a full refund."
  },
  {
    question: "How can I track my order?",
    answer: "You will receive an email with a tracking link once your order has shipped."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to select countries outside the United States."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, American Express, and PayPal."
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="container mx-auto flex-grow">
        <Typography variant="h1" className="text-2xl font-bold mb-6">
          Frequently Asked Questions
        </Typography>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <div
                className="cursor-pointer mb-2 text-lg font-medium"
                onClick={() => toggleAnswer(index)}
              >
                {faq.question}
              </div>
              {openIndex === index && (
                <Typography variant="xsmall" className="text-gray-600">
                  {faq.answer}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
