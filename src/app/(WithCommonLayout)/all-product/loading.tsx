"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-[400px] rounded-xl" />

      <div className="flex flex-col gap-4">
        {/* Title */}
        <Skeleton className="h-8 w-3/4" />

        {/* Price */}
        <Skeleton className="h-6 w-1/4" />

        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />

        {/* Button */}
        <Skeleton className="h-10 w-32 mt-6" />
      </div>
    </div>
  );
};

export default loading;
