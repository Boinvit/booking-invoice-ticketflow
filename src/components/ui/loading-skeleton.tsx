
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  avatar?: boolean;
}

export const LoadingSkeleton = ({ 
  className, 
  lines = 3, 
  avatar = false 
}: LoadingSkeletonProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      {avatar && (
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      )}
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 bg-gray-200 rounded animate-pulse",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
};

export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn("border rounded-lg p-6 space-y-4", className)}>
    <LoadingSkeleton lines={3} avatar />
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex space-x-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>
    ))}
  </div>
);
