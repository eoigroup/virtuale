// app/support/page.tsx
"use client";

import React, { useState } from 'react';
import { Typography } from "@/components/ui/typography";
import Layout from "@/components/static-page-layout/page"; 


// Support Form Component
const SupportPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
  };

  return (
    <Layout>
      <div className="container mx-auto flex-grow">
        <Typography variant="h1" className="text-2xl font-bold mb-6">
          Support
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Your Name" 
            required 
            className="w-full p-2 border"
          />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Your Email" 
            required 
            className="w-full p-2 border"
          />
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Your Message" 
            required 
            className="w-full p-2 border"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SupportPage;
