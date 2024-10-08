import React from "react";
import "./loader.css";
import { cn } from "@/lib/utils";

export const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={cn("loader-2", className)}>
      <div className="loader-2-inner">
        <div className="loader-2-block"></div>
        <div className="loader-2-block"></div>
        <div className="loader-2-block"></div>
        <div className="loader-2-block"></div>
        <div className="loader-2-block"></div>
      </div>
    </div>
  );
};
