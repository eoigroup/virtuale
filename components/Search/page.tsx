"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const SearchPersonas = ({ 
  onSearch 
}: { 
  onSearch: (query: string) => void 
}) => {
  return (
    <div className="relative w-full max-w-sm">
      <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search personas, categories, descriptions..."
        className="pl-10"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchPersonas;