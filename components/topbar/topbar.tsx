"use client";

import React, { useState, useEffect, useRef } from "react";
import UserAvatar from "../user-avatar/user-avatar";
import { Typography } from "../ui/typography";
import { useUser } from "@/contexts/user-context";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { usePersona } from "@/contexts/persona-context";
import { Skeleton } from "../ui/skeleton";
import SearchResultPersonaCard from "../persona-card/search-result-persona";

const Topbar = () => {
  const { user } = useUser();
  const { personas, loading } = usePersona();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPersonas, setFilteredPersonas] = useState(personas);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Filter personas based on the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        setFilteredPersonas(
          personas.filter((persona) =>
            persona.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setDropdownVisible(true); // Show dropdown when searching
      } else {
        setFilteredPersonas(personas); // Reset to all personas if no query
        setDropdownVisible(false); // Hide dropdown when query is empty
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Clear the timeout on every new key press
  }, [searchQuery, personas]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false); // Hide dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-between py-2">
        <Skeleton className="h-7 w-[135px]" />
        <Skeleton className="w-64 md:w-96 h-[52px]" />
      </div>
    );
  }

  return (
    <div className="flex justify-between py-2 pt-0 md:pt-0 pl-12 lg:pl-0">
      <div className="">
        <Typography
            variant={"h6"}
            className="font-normal text-muted-foreground pb-1 md:pl-0"
        >
        Welcome back,
        </Typography>

        <div className=" flex justify-start gap-3">
        <UserAvatar className="w-5 min-w-5 h-5 md:w-7 md:min-w-7 md:h-7" />
        <Typography variant={"h4"}>{user!.username}</Typography>
        </div>
      </div>

      <div className=" justify-end ml-6 gap-3">
        <div ref={searchRef}>
          {/* Backdrop */}
          {dropdownVisible && (
            <div
              className="absolute left-0 top-0 z-[48] h-screen w-screen bg-transparent"
              onClick={() => setDropdownVisible(false)}
            />
          )}

          {/* Search input */}
          <div className="relative z-[49] h-10 w-56 md:w-96">
            <div className="absolute z-40 flex gap-2 w-full max-w-3xl border-spacing-1 border-divider flex-row self-center items-center rounded-full bg-surface-elevation-1 p-4 placeholder:text-placeholder">
              <Search size={16} />
              <div className="relative flex flex-col w-full">
                <div className="relative flex items-center w-full flex-col">
                  <div className="w-full flex justify-start">
                    <div className="relative flex items-center w-full">
                      <Input
                        type="text"
                        placeholder="Search Personas by name"
                        className="bg-transparent border-none p-0 outline-none h-auto"
                        value={searchQuery}
                        onChange={handleSearchChange} // Update search query
                      />
                    </div>
                  </div>
                </div>
              </div>
              {searchQuery && (
                <X
                  strokeWidth={1}
                  size={16}
                  className="cursor-pointer"
                  onClick={() => setSearchQuery("")}
                />
              )}
            </div>
          </div>

          {/* Dropdown with search results */}
          {dropdownVisible && (
            <div className="flex max-w-3xl justify-end md:justify-center self-center">
              <div className="absolute z-[100] mt-5 max-h-[calc(100vh-12rem)] max-w-[90dvw] sm:w-96 overflow-y-scroll rounded-3xl bg-surface-elevation-2 p-2 flex flex-col gap-1">
                {filteredPersonas.length > 0 ? (
                  filteredPersonas.map((persona) => (
                    <SearchResultPersonaCard
                      key={`search-${persona.persona_id}`}
                      persona={persona}
                    />
                  ))
                ) : (
                  <Typography variant={"small"} className="p-4">
                    No Personas found, maybe make one?
                  </Typography>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>


  );
};

export default Topbar;
