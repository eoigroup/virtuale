"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { IPersona } from "@/types/persona";

interface CategoryNavigationProps {
  categories: string[];
  onCategoryClick: (category: string) => void;
  filteredPersonas: { [key: string]: IPersona[] };
}

const CategoryNavigation = ({ 
  categories, 
  onCategoryClick,
  filteredPersonas
}: CategoryNavigationProps) => {
  
  // Filter and sort categories that have personas
  const nonEmptyCategories = categories
    .filter(category => {
      const count = filteredPersonas[category]?.length || 0;
      console.log(`Category ${category}: ${count} personas`); // Debug log
      return count > 0;
    })
    .sort((a, b) => a.localeCompare(b)); // Optional: sort categories alphabetically

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-b">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4">
        {nonEmptyCategories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            size="sm"
            onClick={() => {
              console.log(`Clicking category: ${category}`); // Debug log
              onCategoryClick(category);
            }}
            className="whitespace-nowrap"
          >
            {category} ({filteredPersonas[category]?.length || 0})
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavigation;