"use client";

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return isVisible ? (
    <Button
      className="fixed bottom-8 right-8 rounded-full p-3"
      onClick={scrollToTop}
      size="icon"
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  ) : null;
};

export default BackToTop;