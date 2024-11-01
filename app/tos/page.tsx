"use client";

import React from 'react';
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page"; 

const COMPANY_INFO = {
  name: "EOI 24, Ltd",
  address: "20 Wenlock Road, London, N1 7GU UK",
  email: "virtuale@eoi.group",
  support_url: "https://support.virtuale.ai"
};

const tosData = {
  lastUpdated: "November 1, 2024",
  companyInfo: COMPANY_INFO,
  sections: [
    {
      title: "Welcome to Virtuale.AI",
      content: `These Terms of Service ("Terms") constitute a legally binding agreement between you and ${COMPANY_INFO.name} (trading as "Virtuale.AI," "we," "our," or "us"). They govern your access to and use of our artificial intelligence services, including our website at Virtuale.AI (the "Website"), mobile applications (the "App"), AI models, and related services (collectively, the "Services").`
    },
    {
      title: "Key Points Summary",
      content: `Before diving into the details, here are the key points you should know:
• You must be 16+ to use our Services 
• You own your content, we own our AI models
• You can't use our Services for harmful or illegal purposes
• You're responsible for your account security
• We can terminate access if you violate these Terms
• There are limitations on our liability
• Disputes will be resolved through arbitration in the UK
• AI outputs should be independently verified
• Usage limits and monitoring may apply
• Service performance may vary`
    },
    {
      title: "1. AI Service Usage and Limitations",
      subsections: [
        {
          subtitle: "1.1 Acceptable Use of AI Systems",
          content: `You agree to:
• Use our AI systems responsibly and ethically
• Not attempt to manipulate or deceive our AI models
• Not use our AI for automated decision-making in critical sectors (including but not limited to healthcare, finance, and legal)
• Respect the intellectual property rights in our AI systems
• Not attempt to extract, reverse engineer, or replicate our AI models
• Use AI-generated content in accordance with our guidelines
• Not use our systems for generating harmful or misleading content
• Report any observed misuse or unexpected behavior
• Follow all applicable AI ethics guidelines
• Maintain appropriate human oversight of AI interactions`
        },
        {
          subtitle: "1.2 AI Output Limitations",
          content: `You acknowledge that:
• AI responses may not always be accurate or complete
• AI-generated content should be verified independently
• We don't guarantee specific AI performance levels
• AI models may be updated or modified at any time
• Some AI features may have usage limits
• AI responses may vary based on system load and complexity
• Generated content may contain biases or inaccuracies
• Response quality depends on input quality
• Complex queries may require multiple iterations
• Service availability may fluctuate`
        },
        {
          subtitle: "1.3 Usage Monitoring",
          content: `We maintain the right to:
• Monitor service usage patterns
• Implement rate limiting as needed
• Analyze interaction patterns
• Track system performance
• Detect unusual behavior
• Prevent system abuse
• Optimize resource allocation
• Ensure fair usage
• Protect system integrity
• Maintain service quality`
        }
      ]
    },
    {
      title: "2. User Responsibilities",
      subsections: [
        {
          subtitle: "2.1 Account Requirements",
          content: `Requirements include:
• Minimum age: 13 years (16 in EEA)
• Accurate registration information
• Secure password maintenance
• Prompt reporting of unauthorized access
• No sharing of account credentials
• Regular security measure compliance
• Updated contact information
• Appropriate access controls
• Responsible account management
• Compliance with age restrictions`
        },
        {
          subtitle: "2.2 Prohibited Activities",
          content: `You must not:
• Manipulate AI training or responses
• Create harmful AI interactions
• Automate service access without permission
• Attempt to decode our AI models
• Share account access
• Use AI outputs for misleading purposes
• Create deceptive content
• Bypass security measures
• Overload our systems
• Misuse AI capabilities
• Generate illegal content
• Infringe on third-party rights
• Spread misinformation
• Conduct unauthorized testing`
        }
      ]
    },
    {
      title: "3. Intellectual Property Rights",
      subsections: [
        {
          subtitle: "3.1 AI-Generated Content",
          content: `Regarding AI outputs:
• You own the specific outputs generated through your interactions
• We retain all rights to our AI models and technology
• You grant us permission to use interactions for model improvement
• AI outputs must be used in compliance with these Terms
• Commercial use of AI outputs may require additional licensing
• Attribution requirements may apply
• Derivative works must be clearly marked
• Usage restrictions may vary by content type
• Some outputs may have limited rights
• Bulk generation may have special terms`
        },
        {
          subtitle: "3.2 User Content",
          content: `When you submit content:
• You retain your original rights
• We get a license to use it for service improvement
• It may be used to train our AI models
• You must have necessary permissions
• We can remove content that violates our policies
• Usage rights are non-exclusive
• Content may be modified for training
• Privacy settings will be respected
• Deletion requests will be honored
• Archive copies may be retained`
        }
      ]
    },
    {
      title: "4. AI Model and Service Changes",
      subsections: [
        {
          subtitle: "4.1 Service Modifications",
          content: `We reserve the right to:
• Update AI models and capabilities
• Modify or discontinue features
• Adjust usage limits
• Change pricing structures
• Implement new safety measures
• Improve AI algorithms
• Enhance security protocols
• Update user interfaces
• Modify API endpoints
• Change service parameters`
        },
        {
          subtitle: "4.2 Performance Standards",
          content: `Service standards:
• AI availability is not guaranteed
• Response times may vary
• Model accuracy may fluctuate
• Features may be experimental
• Services may require maintenance
• Backup systems may be limited
• Performance metrics are targets
• Quality may vary by usage
• Updates may affect performance
• Resource allocation is dynamic`
        }
      ]
    },
    {
      title: "5. Liability and Warranties",
      subsections: [
        {
          subtitle: "5.1 Service Warranty Disclaimer",
          content: `The Services are provided "AS IS" without warranties of:
• AI output accuracy
• Model performance
• Uninterrupted service
• Fitness for specific purposes
• Data preservation
• Error-free operation
• Specific outcomes
• Training quality
• Response consistency
• Future availability`
        },
        {
          subtitle: "5.2 Limitation of Liability",
          content: `Liability limitations:
• Maximum liability is the greater of £100 or fees paid in last 12 months
• No liability for consequential damages
• No responsibility for third-party content
• Excluded damages include lost profits
• Indirect damages are not covered
• Technical issues are not compensable
• Data loss liability is limited
• Service interruptions are not compensable
• Model errors are not warrantied
• Output accuracy is not guaranteed`
        }
      ]
    },
    {
      title: "6. Data Processing and Privacy",
      subsections: [
        {
          subtitle: "6.1 AI Training Data",
          content: `Data usage includes:
• User interactions for model training
• Anonymized content for improvement
• Usage patterns for optimization
• Error reports for debugging
• Feedback for enhancement
• Performance metrics collection
• Quality assessment data
• System improvement data
• Research and development
• Safety monitoring data`
        },
        {
          subtitle: "6.2 Data Protection",
          content: `We implement:
• Encryption standards
• Access controls
• Security monitoring
• Regular audits
• Incident response procedures
• Data backup protocols
• Privacy safeguards
• Breach notification procedures
• Employee training
• Vendor assessment`
        }
      ]
    },
    {
      title: "7. Termination",
      subsections: [
        {
          subtitle: "7.1 Termination Rights",
          content: `We may terminate access:
• For Terms violations
• Due to harmful AI use
• For extended inactivity
• To protect our systems
• For legal compliance
• During investigations
• For service maintenance
• Upon user request
• For payment issues
• For security concerns`
        },
        {
          subtitle: "7.2 Post-Termination",
          content: `Upon termination:
• AI access ends immediately
• Data may be retained as required
• Some Terms survive
• You can export your data
• Paid services will be prorated
• Credits are non-refundable
• Access is revoked
• Content may be archived
• Recovery options may be limited
• Legal obligations continue`
        }
      ]
    },
    {
      title: "8. Dispute Resolution",
      subsections: [
        {
          subtitle: "8.1 UK Law Governance",
          content: `Legal framework:
• Terms governed by UK law
• Arbitration in London
• Class action waiver
• Individual claims only
• Small claims permitted
• Jurisdiction specified
• Venue requirements
• Appeal procedures
• Mediation options
• Legal notice requirements`
        },
        {
          subtitle: "8.2 Arbitration Process",
          content: `Process includes:
• Written notice required
• 60-day resolution period
• Arbitrator selection process
• Cost sharing guidelines
• Limited appeals process
• Hearing procedures
• Evidence requirements
• Time limitations
• Confidentiality terms
• Award enforcement`
        }
      ]
    }
  ]
};

const TOSPage = () => {
  return (
    <Layout>
      <div className="container mx-auto flex-grow py-8">
        <Typography variant="h1" className="text-3xl font-bold mb-6">
          Terms of Service
        </Typography>
        
        <div className="mb-4 text-gray-600">
          Last Updated: {tosData.lastUpdated}
        </div>

        {tosData.sections.map((section, index) => (
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
            Contact Information
          </Typography>
          <Typography variant="body" className="text-gray-700">
            For questions or concerns regarding these Terms of Service, please contact us at:
            <br />
            <br />
            {tosData.companyInfo.name}
            <br />
            {tosData.companyInfo.address}
            <br />
            Email: {tosData.companyInfo.email}
          </Typography>
        </div>
      </div>
    </Layout>
  );
};

export default TOSPage;