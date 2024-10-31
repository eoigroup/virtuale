"use client";

import React from 'react';
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page"; 
import BannerSolo from "@/components/banner/bannersolo_ci1";


const CompanyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto  flex-grow">
        <Typography variant="h1" className="text-2xl font-bold mb-6">
       <BannerSolo />
       
        Company

        </Typography>
        <Typography variant="body" className="text-gray-700">
        coming soon
        </Typography>
      </div>
    </Layout>
  );
};

export default CompanyPage;
