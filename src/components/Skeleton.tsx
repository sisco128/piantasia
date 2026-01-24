interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div 
      className={`animate-pulse bg-[#2B5142]/10 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col h-full">
      <Skeleton className="h-64 rounded-none" />
      <div className="p-6 flex flex-col flex-grow">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center justify-between mt-auto">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-screen bg-[#2B5142]/20 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-8 w-2/3 mx-auto mb-12" />
          <div className="flex gap-6 justify-center">
            <Skeleton className="h-14 w-36 rounded-full" />
            <Skeleton className="h-14 w-36 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
