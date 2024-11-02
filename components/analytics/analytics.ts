// components/analytics/analytics.ts

// Types for analytics events
type AnalyticsEvent = {
    timestamp: number;
    type: string;
    data: any;
  };
  
  // Analytics utility class
  export const Analytics = {
    // Track page views
    trackPageView: () => {
      logEvent('page_view', {
        page: window.location.pathname,
      });
    },
  
    // Track category views
    trackCategoryView: (category: string) => {
      logEvent('category_view', {
        category,
        viewDuration: 0, // Will be updated by intersection observer
      });
    },
  
    // Track persona clicks
    trackPersonaClick: (personaId: string, category: string) => {
      logEvent('persona_click', {
        personaId,
        category,
      });
    },
  
    // Track search actions
    trackSearch: (query: string) => {
      logEvent('search', {
        query,
        resultCount: 0, // Can be updated with actual results count
      });
    },
  
    // Track sorting actions
    trackSort: (sortOrder: 'asc' | 'desc') => {
      logEvent('sort', {
        sortOrder,
      });
    },
  
    // Track category navigation
    trackCategoryNavigation: (category: string) => {
      logEvent('category_navigation', {
        category,
      });
    },
  
    // Track scroll depth
    trackScrollDepth: (depth: number) => {
      logEvent('scroll_depth', {
        depth,
        url: window.location.pathname,
      });
    },
  
    // Track session data
    trackSessionStart: () => {
      logEvent('session_start', {
        startTime: new Date().toISOString(),
      });
    },
  
    trackSessionEnd: () => {
      logEvent('session_end', {
        endTime: new Date().toISOString(),
      });
    },
  };
  
  // Helper function to log events
  function logEvent(eventName: string, eventData: any) {
    const event: AnalyticsEvent = {
      timestamp: Date.now(),
      type: eventName,
      data: eventData,
    };
  
    // Log to console for development
    console.log('Analytics Event:', event);
  
    // Here you can add your analytics service implementation
    // Example for Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, eventData);
    }
  
    // Example for Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('event', {
        name: eventName,
        ...eventData,
      });
    }
  
    // Example for Mixpanel
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.track(eventName, eventData);
    }
  }
  
  // Initialize analytics
  export function initAnalytics() {
    if (typeof window === 'undefined') return;
  
    // You can add initialization code for your analytics service here
    console.log('Analytics initialized');
  }