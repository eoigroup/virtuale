"use client";

import React, { useState, useMemo } from 'react';
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page"; 
import { ChevronDown, ChevronUp, X } from "lucide-react";

// Type Definitions
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  status: string;
  showListing: boolean;
  showMoreInfo: boolean;
  postedDate: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

interface Filters {
  department: string;
  location: string;
  type: string;
}

interface CompanyInfo {
  name: string;
  address: string;
  email: string;
  careers_url: string;
}

interface CareerContent {
  hero: {
    title: string;
    description: string;
  };
  noJobsMessage: {
    title: string;
    description: string;
  };
  values: Array<{
    title: string;
    description: string;
  }>;
}

// Company Information
const COMPANY_INFO: CompanyInfo = {
  name: "EOI 24, Ltd",
  address: "20 Wenlock Road, London, N1 7GU UK",
  email: "careers@eoi.group",
  careers_url: "https://careers.virtuale.ai"
};

const careersContent: CareerContent = {
  hero: {
    title: "Join Our Mission",
    description: "Help us build the future of artificial intelligence. We're always looking for exceptional talent to join our team."
  },
  noJobsMessage: {
    title: "No Current Openings",
    description: "While we don't have any open positions right now, we're always interested in connecting with talented individuals. Send your CV to careers@eoi.group and we'll keep you in mind for future opportunities."
  },
  values: [
    {
      title: "Innovation First",
      description: "We push the boundaries of what's possible in AI"
    },
    {
      title: "Impact Driven",
      description: "Your work will help shape the future of technology"
    },
    {
      title: "Collaborative Culture",
      description: "Work with world-class experts in AI and engineering"
    },
    {
      title: "Growth Mindset",
      description: "Continuous learning and development opportunities"
    }
  ]
};

const jobListings: Job[] = [
  {
    id: "ai-research-1",
    title: "Senior AI Research Scientist",
    department: "Research & Development",
    location: "London, UK (Hybrid)",
    type: "Full-time",
    experience: "5+ years",
    status: "Active",
    showListing: false,
    showMoreInfo: false,
    postedDate: "2024-11-01",
    overview: "Join our core AI research team to advance the frontiers of artificial intelligence and natural language processing.",
    responsibilities: [
      "Lead research initiatives in large language models and neural networks",
      "Develop novel architectures for improving AI model performance",
      "Publish research findings in top-tier conferences and journals",
      "Collaborate with engineering teams to implement research findings",
      "Mentor junior researchers and contribute to the research roadmap",
      "Participate in academic partnerships and research communities"
    ],
    requirements: [
      "Ph.D. in Computer Science, AI, or related field",
      "Strong publication record in NLP, ML, or AI",
      "Experience with PyTorch or TensorFlow",
      "Proven track record of implementing research into production",
      "Excellent communication and collaboration skills",
      "Background in large language models preferred"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible working arrangements",
      "Learning and development budget",
      "Regular team events and conferences",
      "26 days annual leave"
    ]
  },
  {
    id: "ml-eng-1",
    title: "Machine Learning Engineer",
    department: "Engineering",
    location: "London, UK (Hybrid)",
    type: "Full-time",
    experience: "3+ years",
    status: "Active",
    showListing: false,
    showMoreInfo: false,
    postedDate: "2024-11-01",
    overview: "We're seeking an experienced ML engineer to help build and deploy our next-generation AI models.",
    responsibilities: [
      "Design and implement ML pipelines for model training and deployment",
      "Optimize model performance and infrastructure efficiency",
      "Collaborate with research team to productionize new models",
      "Develop and maintain ML infrastructure and monitoring",
      "Implement data processing and feature engineering pipelines",
      "Ensure reliability and scalability of ML systems"
    ],
    requirements: [
      "BSc/MSc in Computer Science or related field",
      "Strong Python programming skills",
      "Experience with ML frameworks (PyTorch, TensorFlow)",
      "Knowledge of ML ops and deployment practices",
      "Familiarity with cloud platforms (AWS/GCP)",
      "Understanding of distributed systems"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Health, dental, and vision insurance",
      "Flexible working arrangements",
      "Learning and development budget",
      "Regular team events",
      "26 days annual leave"
    ]
  }
];

// Helper function with proper typing
const getUniqueValues = (jobs: Job[], key: keyof Job): string[] => {
  const valuesMap: { [key: string]: boolean } = {};
  
  jobs.forEach(job => {
    const value = String(job[key]);
    if (value) {
      valuesMap[value] = true;
    }
  });
  
  return Object.keys(valuesMap).sort();
};

interface FilterSectionProps {
  activeJobs: Job[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  activeJobs, 
  filters, 
  setFilters, 
  hasActiveFilters,
  resetFilters 
}) => {
  const departments = useMemo(() => getUniqueValues(activeJobs, 'department'), [activeJobs]);
  const locations = useMemo(() => getUniqueValues(activeJobs, 'location'), [activeJobs]);
  const types = useMemo(() => getUniqueValues(activeJobs, 'type'), [activeJobs]);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <Typography variant="h3" className="text-xl font-semibold">
          Filters
        </Typography>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <X className="w-4 h-4 mr-1" />
            Reset Filters
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            value={filters.department}
            onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
            className="w-full p-2 border rounded-md bg-white text-black dark:text-black"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="w-full p-2 border rounded-md bg-white text-black dark:text-black"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="w-full p-2 border rounded-md bg-white text-black dark:text-black"
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

const ValuesSection: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-6 my-12">
    {careersContent.values.map((value, index) => (
      <div key={index} className="p-6 border rounded-lg shadow-sm bg-white">
        <h3 className="text-black dark:text-black text-lg font-semibold mb-2">{value.title}</h3>
        <p className="text-gray-600">{value.description}</p>
      </div>
    ))}
  </div>
);

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!job.showListing) return null;

  return (
    <div className="mb-6 border rounded-lg shadow-sm bg-white">
      <div className="p-6 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600">
              {job.department} • {job.location} • {job.type}
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors border-b"
      >
        <span className="font-medium">Overview & Details</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isOpen && job.showMoreInfo && (
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <Typography variant="h3" className="text-lg font-medium mb-2">
                Overview
              </Typography>
              <Typography variant="body" className="text-gray-600">
                {job.overview}
              </Typography>
            </div>
            
            <div>
              <Typography variant="h3" className="text-lg font-medium mb-2">
                Key Responsibilities
              </Typography>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <div>
              <Typography variant="h3" className="text-lg font-medium mb-2">
                Requirements
              </Typography>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <Typography variant="h3" className="text-lg font-medium mb-2">
                Benefits
              </Typography>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CareersPage: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    department: '',
    location: '',
    type: ''
  });

  const activeJobs = jobListings.filter(job => job.showListing);

  const filteredJobs = useMemo(() => {
    return activeJobs.filter(job => {
      const departmentMatch = !filters.department || job.department === filters.department;
      const locationMatch = !filters.location || job.location === filters.location;
      const typeMatch = !filters.type || job.type === filters.type;
      return departmentMatch && locationMatch && typeMatch;
    });
  }, [activeJobs, filters]);

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const resetFilters = () => {
    setFilters({
      department: '',
      location: '',
      type: ''
    });
  };

  const hasJobs = filteredJobs.length > 0;

  return (
    <Layout>
      <div className="container mx-auto flex-grow py-8">
        <div className="text-center mb-12">
          <Typography variant="h1" className="text-4xl font-bold mb-4">
            {careersContent.hero.title}
          </Typography>
          <Typography variant="body" className="text-xl text-gray-600">
            {careersContent.hero.description}
          </Typography>
        </div>

        <ValuesSection />

        <div className="mt-12">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <Typography variant="h2" className="text-2xl font-bold">
                Open Positions ({filteredJobs.length})
                {hasActiveFilters && ` of ${activeJobs.length}`}
              </Typography>
            </div>
            
            <FilterSection
              activeJobs={activeJobs}
              filters={filters}
              setFilters={setFilters}
              hasActiveFilters={hasActiveFilters}
              resetFilters={resetFilters}
            />
          </div>

          {hasJobs ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <div className="text-black dark:text-black p-6 text-center border rounded-lg shadow-sm bg-white">
            {hasActiveFilters ? (
              <>
                <h3 className="text-lg font-semibold mb-4">No Matching Positions</h3>
                <p className="text-gray-600">Try adjusting your filters to see more opportunities.</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset Filters
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">{careersContent.noJobsMessage.title}</h3>
                <p className="text-gray-600">{careersContent.noJobsMessage.description}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  </Layout>
);
};

export default CareersPage;