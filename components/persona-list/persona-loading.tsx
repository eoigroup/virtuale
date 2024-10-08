import React from "react";
import { Skeleton } from "../ui/skeleton";

const PersonaLoading = () => {
  return (
    <div className="mt-10 grid grid-cols-4 gap-4">
      {[...Array(6)].map((el, index) => (
        <div key={`persona-loading-${index}`} className="col-span-1 h-[145px]">
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default PersonaLoading;
