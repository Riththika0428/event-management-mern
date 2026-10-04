export default function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-300"></div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Category Badge Skeleton */}
        <div className="h-6 bg-gray-300 rounded-full w-24 mb-3"></div>

        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>

        {/* Description Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>

        {/* Details Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}