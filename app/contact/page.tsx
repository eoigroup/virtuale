"use client";

import React from 'react';
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page"; 

const ContactPage = () => {
  return (
    <Layout>
      <div className="container mx-auto  flex-grow">
        <Typography variant="h1" className="text-2xl font-bold mb-6">
        Contact

        </Typography>
        <Typography variant="body" className="text-gray-700">
        coming soon
        </Typography>
      </div>
    </Layout>
  );
};

export default ContactPage;
