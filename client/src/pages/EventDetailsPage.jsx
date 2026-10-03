import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import RegistrationForm from '../components/RegistrationForm';
import RegistrationSuccess from '../components/RegistrationSuccess';
import Footer from '../components/Footer';
import { useEventDetail } from '../hooks/useEventDetail';
import { Link } from 'react-router-dom';

export default function EventDetailsPage() {
  const { id } = useParams();
  const { event, loading, error } = useEventDetail(id);
  const [isRegistered, setIsRegistered] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error || !event) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <span>/</span>
            <Link to="/" className="text-blue-600 hover:underline">Events</Link>
            <span>/</span>
            <span className="text-gray-900">{event.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="md:col-span-2">
            
            {/* Event Image */}
            <div className="mb-8">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Event Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
                  {event.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{event.title}</h1>
              <p className="text-lg text-gray-600">{event.description}</p>
            </div>

            {/* Event Information Grid */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Event Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📅</div>
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">🕐</div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold text-gray-900">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">👤</div>
                  <div>
                    <p className="text-sm text-gray-600">Organizer</p>
                    <p className="font-semibold text-gray-900">{event.organizer}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About this Event</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{event.description}</p>
              <p className="text-gray-700 leading-relaxed">
                Join us for an enriching experience. Whether you're looking to learn new skills, network with like-minded professionals, or explore new opportunities, this event is designed with you in mind.
              </p>
            </div>
          </div>

          {/* Sidebar - Registration Form */}
          <div className="md:col-span-1">
            <div className="sticky top-20">
              {isRegistered ? (
                <RegistrationSuccess eventTitle={event.title} />
              ) : (
                <RegistrationForm
                  eventId={id}
                  onSuccess={() => setIsRegistered(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}