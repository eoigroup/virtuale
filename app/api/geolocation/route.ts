import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || '127.0.0.1';
    
    // For localhost/development testing
    if (ip === '127.0.0.1' || ip === '::1' || ip === 'localhost') {
      const publicIpResponse = await fetch('https://api.ipify.org?format=json');
      const publicIpData = await publicIpResponse.json();
      const publicIp = publicIpData.ip;
      
      const geoResponse = await fetch(`https://ipapi.co/${publicIp}/json/`);
      const geoData = await geoResponse.json();
      
      return NextResponse.json({
        city: geoData.city || 'London',
        country: geoData.country_name || 'United Kingdom',
        countryCode: geoData.country_code || 'GB'
      });
    }

    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return NextResponse.json({
      city: data.city || 'London',
      country: data.country_name || 'United Kingdom',
      countryCode: data.country_code || 'GB'
    });

  } catch (error) {
    console.error('Geolocation error:', error);
    return NextResponse.json({
      city: 'London',
      country: 'United Kingdom',
      countryCode: 'GB'
    });
  }
} 