import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 animate-pulse">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-4">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
};

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export const SkeletonHero: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
      <div className="text-center space-y-6 px-4">
        <Skeleton className="h-16 w-96 mx-auto rounded-2xl" />
        <Skeleton className="h-8 w-64 mx-auto rounded-xl" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-12 w-32 rounded-xl" />
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
