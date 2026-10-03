export default function EmptyState() {
  return (
    <div className="min-h-96 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-4 text-5xl">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No events found</h2>
        <p className="text-gray-600">Try changing your search terms or filters</p>
      </div>
    </div>
  );
}