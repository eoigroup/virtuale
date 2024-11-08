'use client';

import { useEffect, useState } from 'react';

interface PricingData {
  price: string;
  countryCode: string;
  timestamp: number;
}

const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export default function Pricing() {
  const [pricing, setPricing] = useState<PricingData | null>(null);

  useEffect(() => {
    async function getPricing() {
      // Check cache first
      const cachedData = localStorage.getItem('pricing-data');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        // Check if cache is still valid (within 24 hours)
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          setPricing(parsed);
          return;
        }
      }

      // If no cache or expired, fetch new data
      try {
        const response = await fetch('/api/geolocation');
        const data = await response.json();
        
        let price = '$19.99'; // Default price
        if (data.countryCode === 'GB' || data.countryCode === 'UK') {
          price = '£15.49';
        } else if (data.countryCode === 'EU') {
          price = '€18.49';
        } else if (data.countryCode === 'US') {
          price = '$19.99';
        }

        const pricingData = {
          price,
          countryCode: data.countryCode,
          timestamp: Date.now()
        };

        // Update state and cache
        setPricing(pricingData);
        localStorage.setItem('pricing-data', JSON.stringify(pricingData));
      } catch (error) {
        console.error('Error fetching location:', error);
        setPricing({
          price: '$11.99',
          countryCode: 'UNKNOWN',
          timestamp: Date.now()
        });
      }
    }

    getPricing();
  }, []);

  if (!pricing) return '$11.99'; // Default fallback

  return pricing.price;
} 