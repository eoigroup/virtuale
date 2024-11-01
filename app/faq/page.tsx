"use client";

import React, { useState } from 'react';
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const faqCategories = {
  general: {
    title: "General",
    faqs: [
      {
        question: "What is Virtuale.ai?",
        answer: "Virtuale.ai is powered by advanced deep learning models, including large language models, built and trained specifically for natural conversation. Our platform enables users to interact with a diverse range of AI personas across various interests and topics."
      },
      {
        question: "How does Virtuale.ai work?",
        answer: "Our platform utilizes neural language models trained on vast amounts of text data. These models learn to generate contextually appropriate responses based on the conversation flow and the specific persona they're embodying."
      },
      {
        question: "Can I trust the responses given?",
        answer: "AI personas may sometimes generate fictional information or creative responses. While they can be highly entertaining and useful for many purposes, they might occasionally reference non-existent content or create imaginative examples. Always verify any factual claims independently."
      },
      {
        question: "What content is allowed on Virtuale.ai?",
        answer: "We support a wide range of creative and educational content while maintaining appropriate boundaries. Our platform prohibits explicit adult content, hate speech, and harmful material. Full guidelines are available in our Terms of Service."
      },
      {
        question: "Can personas express different personality types?",
        answer: "Yes! We support diverse personality types, including more assertive or playful personas. However, all interactions must adhere to our community guidelines."
      },
      {
        question: "Is mild profanity allowed?",
        answer: "Yes, mild profanity is permitted when appropriate to the persona and context, excluding hate speech or severe profanity."
      },
      {
        question: "How do you handle misinformation?",
        answer: "We encourage users to verify any factual claims independently and have systems in place to flag potential misinformation."
      },
      {
        question: "How do you handle emergency situations?",
        answer: "We provide clear disclaimers that personas are not substitutes for emergency services or professional help."
      }
    ]
  },
  privacy: {
    title: "Privacy & Security",
    faqs: [
      {
        question: "Why does Virtuale.ai ask for my name and birthday?",
        answer: "We ask for your name to create a personalized experience and maintain a respectful community environment. Regarding age verification, we require users to be over a minimum age to engage with personas, and help meet our legal obligations. While we will not display your age or birthday publicly, we may also use this information for the purposes stated in our Privacy Policy, including to personalize your experience, help keep our Services safe, learn more about how our Services are used, and improve our Services."
      },
      {
        question: "Are conversations private?",
        answer: "Yes! We offer privacy settings for both created personas and conversations. You can choose whether your content is public or private. Public content may be reviewed by moderators to ensure community guidelines are met."
      },
      {
        question: "Can persona creators see my conversations?",
        answer: "No. Creators cannot access or view any conversations users have with their personas."
      },
      {
        question: "How is my data protected?",
        answer: "We implement industry-standard security measures to protect user data. All conversations are encrypted, and we maintain strict access controls for user information."
      },
      {
        question: "Can I export my conversations?",
        answer: "Yes! Users can export their conversation history for personal reference."
      },
      {
        question: "Are there age-appropriate filters?",
        answer: "Yes! We offer different content filtering levels suitable for various age groups."
      },
      {
        question: "How do you handle intellectual property rights?",
        answer: "Users retain rights to their original content while granting us limited license to use it for service improvement."
      }
    ]
  },
  features: {
    title: "Features & Usage",
    faqs: [
      {
        question: "Can I create multiple personas?",
        answer: "Yes! Users can create multiple personas, each with unique personalities, knowledge bases, and interaction styles."
      },
      {
        question: "How do I improve my persona's responses??",
        answer: "Provide detailed background information, example dialogues, and clear personality traits when creating your persona. User feedback helps refine responses over time."
      },
      {
        question: "Are there educational uses for Virtuale.ai?",
        answer: "Yes! Many educators use our platform for language practice, roleplay scenarios, and interactive learning experiences."
      },
      {
        question: "Can personas help with creative writing?",
        answer: "Absolutely! Many users collaborate with personas for storytelling, character development, and creative writing exercises."
      },
      {
        question: "Is there a limit to conversation length?",
        answer: "While there's no strict limit, longer conversations may experience some context limitations. We recommend starting new sessions for fresh topics."
      },
      {
        question: "Can I switch languages during conversations?",
        answer: "Yes! Our personas support multiple languages and can switch between them naturally during conversations."
      },
      {
        question: "Can personas help with professional tasks?",
        answer: "While personas can assist with brainstorming and general discussion, they should not be relied upon for professional or medical advice."
      },
      {
        question: "Can personas remember user preferences?",
        answer: "Within individual sessions, personas can maintain consistency with user preferences and previous interactions."
      },
      {
        question: "Can I use personas for business purposes?",
        answer: "Yes, with appropriate licensing. Contact our business team for commercial use cases."
      }
    ]
  },
  premium: {
    title: "Premium Features",
    faqs: [
      {
        question: "What premium features are available?",
        answer: "Yes! Premium subscribers get access to advanced features, longer conversation contexts, and priority access to new personas."
      },
      {
        question: "How do I cancel my subscription?",
        answer: "You can cancel your subscription anytime through your profile settings. Just navigate to Settings > Subscription > Cancel Subscription."
      },
      {
        question: "Can I continue using the service after canceling?",
        answer: "Yes, your subscription will remain active until the end of your current billing period. You won't be charged again after canceling."
      },
      {
        question: "Will I keep my chat history if I cancel?",
        answer: "Yes, whenever you're ready to come back, everything will be exactly as you left it. Your chat history and preferences are preserved."
      },
      {
        question: "Can I get a refund?",
        answer: "We do not offer refunds for subscription payments. Your service will continue until the end of your billing period."
      },
      {
        question: "What happens to my personas after canceling?",
        answer: "Your created personas will remain intact but may have limited features until you reactivate your premium subscription."
      }
    ]
  },
  technical: {
    title: "Technical",
    faqs: [
      {
        question: "Is there an API available?",
        answer: "YES, we provide API's for our service and technologies via our creators platform Identica.AI. For specific use cases, please contact api@eoi.group to discuss potential partnerships."
      },
      {
        question: "What happens if the website is down?",
        answer: "Check our status page at status.virtuale.ai or follow our social media channels for updates about any service interruptions or maintenance."
      },
      {
        question: "Why do personas sometimes forget previous conversations?",
        answer: "Personas have a limited conversation context window. While they maintain consistency within individual conversations, they may not recall details from much earlier in the chat history. We're constantly working to expand this capability."
      },
      {
        question: "How do you handle user feedback?",
        answer: "We actively collect and incorporate user feedback to improve persona responses and platform features."
      },
      {
        question: "Is there a mobile app available?",
        answer: "Not at the time! iOS and Android coming soon."
      },
      {
        question: "What accessibility features are available?",
        answer: "We support screen readers, audio calls, keyboard navigation, and other accessibility tools."
      },
      {
        question: "How often are new personas added?",
        answer: "We regularly add new personas and encourage community contributions following our creation guidelines."
      },
      {
        question: "Are there community features?",
        answer: "Yes! Users can share personas, rate interactions, and participate in community challenges."
      }
    ]
  }
};

interface FAQSectionProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs, openIndex, setOpenIndex }) => (
  <div className="space-y-4">
    {faqs.map((faq, index) => (
      <div key={index} className="border rounded-lg p-4 shadow-sm bg-black hover:shadow-md transition-shadow">
        <div
          className="cursor-pointer flex justify-between items-center"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <Typography variant="small" className="text-white dark:text-white font-medium mb-4">
            {faq.question}
          </Typography>
          <span className="text-gray-500">
            {openIndex === index ? '−' : '+'}
          </span>
        </div>
        {openIndex === index && (
          <Typography variant="xsmall" className="text-white dark:text-white mt-6">
            {faq.answer}
          </Typography>
        )}
      </div>
    ))}
  </div>
);

const FAQPage: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<Record<string, number | null>>({});

  return (
    <Layout>
      <div className="container mx-auto flex-grow py-8">
        <Typography variant="h1" className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </Typography>
        
        <Tabs defaultValue="general" className="w-full">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <TabsList className="flex justify-start mb-8 whitespace-nowrap min-w-fit">
              {Object.entries(faqCategories).map(([key, category]) => (
                <TabsTrigger key={key} value={key} className="px-4 py-2">
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(faqCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="grid md:grid-cols-2 gap-6">
                <FAQSection
                  faqs={category.faqs.slice(0, Math.ceil(category.faqs.length / 2))}
                  openIndex={openIndices[key]}
                  setOpenIndex={(index) => setOpenIndices({...openIndices, [key]: index})}
                />
                <FAQSection
                  faqs={category.faqs.slice(Math.ceil(category.faqs.length / 2))}
                  openIndex={openIndices[key + '_second']}
                  setOpenIndex={(index) => setOpenIndices({...openIndices, [key + '_second']: index})}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default FAQPage;