export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ['All', 'Technology', 'Business', 'Education', 'Entertainment', 'Workshop'];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:gap-3 md:pb-0">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 md:px-6 py-2 rounded-full font-medium transition whitespace-nowrap ${
            selectedCategory === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}