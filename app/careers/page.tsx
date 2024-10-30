"use client";

import React from 'react';
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page"; 

const CareersPage = () => {
  return (
    <Layout>
      <div className="container mx-auto flex-grow">
        <Typography variant="h1" className="text-2xl font-bold mb-6">
          Careers
        </Typography>
        <Typography variant="body" className="text-gray-700">
          Coming soon
        </Typography>
      </div>
    </Layout>
  );
};

export default CareersPage;
