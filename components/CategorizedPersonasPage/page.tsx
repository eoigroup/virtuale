"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import { ICategory, IPersona } from "@/types/persona";
import { getPersonaCategories } from "@/lib/api/persona";
import { toast } from "sonner";
import PersonaCard from "@/components/persona-card/persona-catgeory-full-card";
import { Typography } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import CategoryNavigation from "@/components/CategoryNavigation/page";
import SearchPersonas from "@/components/Search/page";
import BackToTop from "@/components/BackToTop/page";
import { Analytics } from "@/components/analytics/analytics";
import { Button } from "@/components/ui/button";


// Memoized PersonaCard for better performance
const MemoizedPersonaCard = memo(PersonaCard);

const CategorizedPersonasPage = ({ personas }: { personas: IPersona[] }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [organizedPersonas, setOrganizedPersonas] = useState<{
    [key: string]: IPersona[];
  }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPersonas, setFilteredPersonas] = useState<{
    [key: string]: IPersona[];
  }>({});
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Get categories
  const getCategories = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getPersonaCategories();
      const data = response.data;
      setCategories(data);
      organizePersonas(data, personas);
    } catch (error: any) {
      toast.error(error.message || "Error fetching categories");
    }
    setLoading(false);
  };

  // Organize personas
  const organizePersonas = useCallback((categories: ICategory[], personas: IPersona[]) => {
    const organized: { [key: string]: IPersona[] } = {};
    
    categories.forEach((category) => {
      organized[category.category] = [];
    });
    
    personas.forEach((persona) => {
      if (persona.agent_category) {
        if (!organized[persona.agent_category]) {
          organized[persona.agent_category] = [];
        }
        organized[persona.agent_category].push(persona);
      }
    });

    const uncategorizedPersonas = personas.filter(
      (persona) => !persona.agent_category
    );
    if (uncategorizedPersonas.length > 0) {
      organized["No Category"] = uncategorizedPersonas;
    }

    setOrganizedPersonas(organized);
    setFilteredPersonas(organized);
  }, []);

  // Search functionality
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    const filtered: { [key: string]: IPersona[] } = {};
    
    Object.entries(organizedPersonas).forEach(([category, categoryPersonas]) => {
      filtered[category] = categoryPersonas.filter(persona => 
        // Search in multiple fields
        persona.name.toLowerCase().includes(query.toLowerCase()) ||
        persona.agent_category?.toLowerCase().includes(query.toLowerCase()) ||
        persona.profile_about?.toLowerCase().includes(query.toLowerCase()) ||
        persona.welcome_message?.toLowerCase().includes(query.toLowerCase())
      );
    });
    
    setFilteredPersonas(filtered);
    Analytics.trackSearch(query);
}, [organizedPersonas]);

  // Sorting functionality
  const handleSort = useCallback(() => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    
    const sorted: { [key: string]: IPersona[] } = {};
    Object.entries(filteredPersonas).forEach(([category, categoryPersonas]) => {
      sorted[category] = [...categoryPersonas].sort((a, b) => {
        return newSortOrder === "asc" 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    });
    
    setFilteredPersonas(sorted);
    Analytics.trackSort(newSortOrder);
  }, [sortOrder, filteredPersonas]);

  // Scroll to category
  const scrollToCategory = useCallback((category: string) => {
    const element = document.querySelector(`[data-category="${category}"]`);
    if (element) {
      const headerOffset = 200; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      Analytics.trackCategoryNavigation(category);
    }
  }, []);

  // Initialize
  useEffect(() => {
    getCategories();
    Analytics.trackPageView();
  }, []);

  // Track scroll depth
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
          );
          Analytics.trackScrollDepth(scrollPercent);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="relative">
      <div className="sticky top-[75px] pt-2 z-50 bg-background pb-4">
        <div className="flex flex-col gap-4">
          <Typography variant="h3">
            All Personas by Category
          </Typography>
          
          <div className="flex items-center gap-4">
            <SearchPersonas onSearch={handleSearch} />
            <Button
                variant="outline"
                onClick={handleSort}
                className="flex items-center gap-2"
                >
                Sort by Name {sortOrder === "asc" ? "A-Z ↓" : "Z-A ↑"}
                </Button>
          </div>
        </div>
        
        <CategoryNavigation 
  categories={Object.keys(organizedPersonas)}
  onCategoryClick={scrollToCategory}
  filteredPersonas={filteredPersonas} // Add this prop
/>
      </div>

      <div className="space-y-12">
      {Object.entries(filteredPersonas).map(([category, categoryPersonas]) => (
  categoryPersonas.length > 0 && (
    <section 
      key={category} 
      className="space-y-4"
      data-category={category} // Make sure this is here
      id={`category-${category.toLowerCase().replace(/\s+/g, '-')}`} // Add this for better targeting
    >
      <Typography variant="h4" className="text-2xl font-semibold">
        {category} ({categoryPersonas.length})
      </Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryPersonas.map((persona) => (
                  <div 
                    key={persona.persona_id} 
                    className="w-full"
                    onClick={() => Analytics.trackPersonaClick(persona.persona_id, category)}
                  >
                    <MemoizedPersonaCard persona={persona} />
                  </div>
                ))}
              </div>
            </section>
          )
        ))}
      </div>

      <BackToTop />
    </div>
  );
};

const LoadingState = () => (
  <div className=" space-y-8">
    {[...Array(3)].map((_, index) => (
      <div key={`loading-section-${index}`} className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, cardIndex) => (
            <Skeleton 
              key={`loading-card-${index}-${cardIndex}`} 
              className="h-64 w-full rounded-lg"
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default CategorizedPersonasPage;