import { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import Footer from '../components/Footer';
import { useEvents } from '../hooks/useEvents';

export default function EventsPage() {
  const { events, loading, error, search, setSearch, category, setCategory, fetchEvents } = useEvents();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => fetchEvents(search, category)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover Events That Inspire You</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Find workshops, conferences, networking events, and experiences happening around you.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar search={search} onSearchChange={setSearch} />
          </div>

          {/* Category Filters */}
          <div className="flex justify-center">
            <CategoryFilter selectedCategory={category} onCategoryChange={setCategory} />
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {events.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-700 font-medium">
                Found <span className="font-bold text-blue-600">{events.length}</span> event{events.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}