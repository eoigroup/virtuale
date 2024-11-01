"use client";

import React from 'react';
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page"; 

const COMPANY_INFO = {
  name: "EOI 24",
  address: "20 Wenlock Road, London, N1 7GU UK",
  email: "virtuale@eoi.group",
  support_url: "https://support.virtuale.ai"
};

const privacyData = {
  lastUpdated: "November 1, 2024",
  companyInfo: COMPANY_INFO,
  sections: [
    {
      title: "Our Commitment to Your Privacy",
      content: `At Virtuale.AI, we believe in complete transparency about how we handle your information. This Privacy Policy explains our practices for collecting, using, and protecting your data when you use our artificial intelligence services, applications, and websites (collectively referred to as "Services").

This document is a binding agreement between you and ${COMPANY_INFO.name}. By accessing our Services, you acknowledge and agree to the practices described here. If these terms don't align with your preferences, please discontinue use of our Services.`
    },
    {
      title: "1. Data Collection Practices",
      subsections: [
        {
          subtitle: "Essential Information You Provide",
          content: `To deliver our AI services effectively, we collect:

• Account Details: Your registration information and profile preferences
• Interaction Data: Your conversations with our AI systems and customization choices
• Payment Information: Processed securely through our authorized payment partners
• Support Communications: Your interactions with our customer service team
• Feature Usage: How you utilize specific AI capabilities and tools
• Custom Configurations: Any AI model preferences or settings you establish`
        },
        {
          subtitle: "Technical Data We Gather",
          content: `Our systems automatically collect:

• Service Analytics: How you interact with our AI models
• Technical Markers: Device signatures and connection data
• Performance Metrics: System response times and model behavior
• Usage Patterns: AI interaction frequency and feature utilization
• Error Reports: Technical issues and service interruptions
• Access Logs: Session duration and feature engagement

This information helps us optimize our AI models and improve service reliability.`
        },
        {
          subtitle: "AI Learning Data",
          content: `To improve our artificial intelligence systems, we collect:

• Interaction Patterns: How users engage with our AI models
• Response Quality: Accuracy and relevance of AI outputs
• Model Performance: Processing efficiency and response patterns
• Feature Effectiveness: Usage patterns of different AI capabilities
• Error Patterns: Common issues and resolution paths

This data is crucial for enhancing our AI systems while maintaining user privacy.`
        }
      ]
    },
    {
      title: "2. Using Your Information",
      subsections: [
        {
          subtitle: "Core Service Operations",
          content: `We use your data to:

• Train and improve our AI models
• Personalize your AI interactions
• Optimize response accuracy
• Enhance service reliability
• Debug technical issues
• Prevent system abuse
• Ensure service security`
        },
        {
          subtitle: "Service Enhancement",
          content: `Your information helps us:

• Develop new AI capabilities
• Improve existing features
• Create better user experiences
• Optimize system performance
• Research AI improvements
• Generate usage insights
• Enhance safety measures`
        }
      ]
    },
    {
      title: "3. AI Data Processing",
      content: `Our artificial intelligence systems process your data with specific safeguards:

• Anonymization: Personal identifiers are removed from AI training data
• Segregation: Training data is separated from personal information
• Security: Multiple layers of encryption and access controls
• Privacy: AI models are designed with privacy-preserving techniques
• Control: You can manage how your data is used for AI training
• Transparency: Clear documentation of AI data usage
• Compliance: Adherence to AI ethics and privacy standards`
    },
    {
      title: "4. Data Protection Measures",
      subsections: [
        {
          subtitle: "Technical Safeguards",
          content: `We implement robust security measures:

• Advanced encryption for data transmission
• Secure cloud storage with redundancy
• Regular security audits and testing
• Automated threat detection
• Continuous monitoring systems
• Access control protocols
• Incident response procedures`
        },
        {
          subtitle: "Organizational Controls",
          content: `Our internal practices include:

• Staff security training
• Data handling protocols
• Access level management
• Regular compliance reviews
• Security certification maintenance
• Vendor security assessments
• Documentation requirements`
        }
      ]
    },
    {
      title: "5. Your Privacy Rights",
      subsections: [
        {
          subtitle: "Control Over Your Data",
          content: `You have the right to:

• Access your personal data
• Correct inaccurate information
• Request data deletion
• Restrict processing
• Export your data
• Withdraw consent
• Object to processing
• Manage AI training preferences`
        },
        {
          subtitle: "Special Protections",
          content: `We provide additional safeguards for:

• EU/UK residents (GDPR compliance)
• California residents (CCPA compliance)
• Children's data (COPPA compliance)
• Sensitive information
• AI-generated content
• Biometric data
• Location information`
        }
      ]
    },
    {
      title: "6. AI Ethics and Governance",
      content: `Our commitment to ethical AI includes:

• Transparent AI decision-making processes
• Regular AI bias assessments
• Fair processing principles
• User control over AI interactions
• Clear AI usage documentation
• Ethical AI development practices
• Regular impact assessments

We continuously review and update these practices to maintain high ethical standards in AI development and deployment.`
    },
    {
      title: "7. Data Retention and Deletion",
      content: `We maintain your information only as long as necessary:

• Account data: Retained while account is active
• Usage data: Kept for service improvement
• AI training data: Retained as needed for model improvement
• Technical logs: Stored for security purposes
• Payment data: Retained per legal requirements

You can request deletion of your data at any time, subject to legal retention requirements and technical limitations.`
    }
  ]
};

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto flex-grow py-8">
        <Typography variant="h1" className="text-3xl font-bold mb-6">
          Privacy Policy
        </Typography>
        
        <div className="mb-4 text-gray-600">
          Last Updated: {privacyData.lastUpdated}
        </div>

        {privacyData.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <Typography variant="h2" className="text-xl font-semibold mb-4">
              {section.title}
            </Typography>
            
            {section.content && (
              <Typography variant="body" className="text-gray-700 mb-4 whitespace-pre-line">
                {section.content}
              </Typography>
            )}
            
            {section.subsections && section.subsections.map((subsection, subIndex) => (
              <div key={subIndex} className="mb-6">
                <Typography variant="h3" className="text-lg font-medium mb-2">
                  {subsection.subtitle}
                </Typography>
                <Typography variant="body" className="text-gray-700 whitespace-pre-line">
                  {subsection.content}
                </Typography>
              </div>
            ))}
          </div>
        ))}

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Typography variant="h2" className="text-xl font-semibold mb-4">
            Contact Us
          </Typography>
          <Typography variant="body" className="text-gray-700">
            For questions about this Privacy Policy or to exercise your rights, please contact us at:
            <br />
            <br />
            {privacyData.companyInfo.name}
            <br />
            {privacyData.companyInfo.address}
            <br />
            Email: {privacyData.companyInfo.email}
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;