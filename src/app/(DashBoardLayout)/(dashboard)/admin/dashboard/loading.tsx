"use client";

import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="p-6">
      <div className="text-2xl font-semibold mb-4">Loading data...</div>
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-4 bg-gray-100 p-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="space-y-4 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
