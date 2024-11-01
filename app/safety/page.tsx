"use client";

import React from 'react';
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page";
import StaticCard from "@/components/static-card/static-card-large";
import { Shield, Lock, UserCheck, Bell, Brain } from "lucide-react";

/* eslint-disable react/no-unescaped-entities */


const SafetyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Typography variant="h1" className="text-4xl font-bold mb-4">
              Your Safety is Our Priority
            </Typography>
            <Typography variant="body" className="text-gray-600 text-xl">
              We've built comprehensive safety measures into every interaction to ensure 
              your experience with our AI personas is secure, private, and beneficial.
            </Typography>
          </div>

          {/* Main Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <StaticCard 
              variant="large"
              icon={<UserCheck className="w-12 h-12 text-black dark:text-black" />}
              title="You&apos;re in Control"
              desc="Customize your interaction preferences, set boundaries, and manage your experience. You decide how you want to engage with our AI personas."
            />
            
            <StaticCard 
              variant="large"
              icon={<Lock className="w-12 h-12 text-black dark:text-black" />}
              title="Private and Secure"
              desc="Your conversations and data are encrypted end-to-end. We use industry-leading security measures to protect your privacy and personal information."
            />
          </div>

          {/* Safety Features Section */}
          <div className="mb-16">
            <Typography variant="h2" className="text-2xl font-bold mb-8">
              Our Safety Commitments
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Shield className="w-8 h-8 text-blue-500 mb-4 text-black dark:text-black" />
                <Typography variant="h3" className="text-xl font-semibold mb-2 text-black dark:text-black">
                  Content Monitoring
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Real-time content filtering and monitoring systems ensure interactions 
                  remain appropriate and safe for all users.
                </Typography>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Brain className="w-8 h-8 text-blue-500 mb-4 text-black dark:text-black" />
                <Typography variant="h3" className="text-xl font-semibold mb-2 text-black dark:text-black">
                  Ethical AI Development
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Our AI models are developed with strong ethical guidelines and regular 
                  auditing to prevent harmful biases and ensure responsible behavior.
                </Typography>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Bell className="w-8 h-8 text-blue-500 mb-4 text-black dark:text-black" />
                <Typography variant="h3" className="text-xl font-semibold mb-2 text-black dark:text-black">
                  24/7 Incident Response
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Our dedicated safety team is available around the clock to respond to 
                  any concerns or safety-related incidents.
                </Typography>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Brain className="w-8 h-8 text-blue-500 mb-4 text-black dark:text-black" />
                <Typography variant="h3" className="text-xl font-semibold mb-2 text-black dark:text-black">
                  Clear Boundaries
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Our AI personas have built-in safeguards and will not engage in harmful, 
                  illegal, or inappropriate content or behavior.
                </Typography>
              </div>
            </div>
          </div>

          {/* Guidelines Section */}
          <div className="bg-gray-50 p-8 rounded-xl mb-16">
            <Typography variant="h2" className="text-2xl font-bold mb-6 text-black dark:text-black">
              Community Guidelines
            </Typography>
            
            <div className="space-y-4">
              <div>
                <Typography variant="h3" className="text-lg font-semibold mb-2 text-black dark:text-black">
                  Respectful Interaction
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Treat AI personas and other community members with respect. Harassment, 
                  hate speech, or discriminatory behavior is not tolerated.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" className="text-lg font-semibold mb-2 text-black dark:text-black">
                  Personal Information
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Never share sensitive personal information such as financial details, 
                  addresses, or identification numbers during AI interactions.
                </Typography>
              </div>

              <div>
                <Typography variant="h3" className="text-lg font-semibold mb-2 text-black dark:text-black">
                  Content Appropriateness
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Keep conversations appropriate. Explicit content, illegal activities, 
                  or harmful behavior will be automatically filtered and may result in 
                  account suspension.
                </Typography>
              </div>
            </div>
          </div>

          {/* Reporting Section */}
          <div className="bg-white p-8 rounded-xl border border-gray-200 mb-16">
            <Typography variant="h2" className="text-2xl font-bold mb-6 text-black dark:text-black">
              Report a Concern
            </Typography>
            
            <Typography variant="body" className="text-gray-600 mb-6">
              If you encounter any issues or have safety concerns, we're here to help. 
              You can report problems in several ways:
            </Typography>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-black dark:text-black">
                  1
                </div>
                <Typography variant="body" className="text-gray-600">
                  Use the &quot;Report&quot; button during any AI interaction
                </Typography>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-black dark:text-black">
                  2
                </div>
                <Typography variant="body" className="text-gray-600">
                  Contact our support team 
                </Typography>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-black dark:text-black">
                  3
                </div>
                <Typography variant="body" className="text-gray-600">
                  Submit a detailed report through our Safety Portal
                </Typography>
              </div>
            </div>
          </div>

          {/* Emergency Resources */}
          <div className="mb-16">
            <Typography variant="h2" className="text-2xl font-bold mb-6 text-black dark:text-white">
              Emergency Resources
            </Typography>
            
            <Typography variant="body" className="text-gray-600 mb-4">
              While our AI personas are designed to be helpful companions, they are not 
              substitutes for professional help in crisis situations. If you need immediate 
              assistance, please contact:
            </Typography>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <Typography variant="body" className="font-semibold text-black dark:text-black">
                  Emergency Services: 911 (US) / 112 (EU)
                </Typography>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <Typography variant="body" className="font-semibold text-black dark:text-black">
                  Crisis Text Line: Text HOME to 741741
                </Typography>
              </div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                <Typography variant="body" className="font-semibold text-black dark:text-black">
                  National Suicide Prevention Lifeline: 1-800-273-8255
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SafetyPage;