'use client';

import { useEffect, useState } from 'react';

interface GeolocationData {
  city: string;
  country: string;
}

export default function Geolocation() {
  const [location, setLocation] = useState<GeolocationData | null>(null);

  useEffect(() => {
    async function getLocation() {
      try {
        const response = await fetch('/api/geolocation');
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    }

    getLocation();
  }, []);

  if (!location) return null;

  return (
    <span>
      In {location.city}, {location.country}
    </span>
  );
} 