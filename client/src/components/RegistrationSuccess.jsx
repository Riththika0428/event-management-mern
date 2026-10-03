import { Link } from 'react-router-dom';

export default function RegistrationSuccess({ eventTitle }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">You're registered!</h3>
      <p className="text-gray-600 mb-2">Your registration has been successfully submitted.</p>
      <p className="text-gray-600 mb-6">We look forward to seeing you at <span className="font-semibold">{eventTitle}</span>.</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Back to Events
      </Link>
    </div>
  );
}