import React from "react";
import { Skeleton } from "../ui/skeleton";

const PersonaLoading = () => {
  return (
    <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
      {[...Array(4)].map((el, index) => (
        <div key={`persona-loading-${index}`} className="col-span-1 h-[145px]">
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default PersonaLoading;
