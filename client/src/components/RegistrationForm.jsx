import { useState } from 'react';
import { registrationService } from '../services/api';
import { useToast } from '../hooks/useToast';

export default function RegistrationForm({ eventId, onSuccess }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9\-\+\(\)\s]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters';
    } else if (formData.fullName.trim().length > 100) {
      errors.fullName = 'Name must not exceed 100 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address (e.g., user@example.com)';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation for touched fields
    if (touched[name]) {
      const errors = validateForm();
      if (errors[name]) {
        setValidationErrors(prev => ({
          ...prev,
          [name]: errors[name]
        }));
      } else {
        setValidationErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate this field
    const errors = validateForm();
    if (errors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: errors[name]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true
    });

    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      addToast('Please fix the errors below', 'error');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await registrationService.registerForEvent(eventId, formData);
      addToast('Successfully registered for the event!', 'success', 2000);
      onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Register for this event</h3>
      <p className="text-gray-600 text-sm mb-6">Fill in your details below to secure your spot</p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <span className="text-red-600 text-lg flex-shrink-0">⚠️</span>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.fullName && touched.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {validationErrors.fullName && touched.fullName && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>✕</span> {validationErrors.fullName}
            </p>
          )}
          {formData.fullName && !validationErrors.fullName && touched.fullName && (
            <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
              <span>✓</span> Looks good!
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email (e.g., john@example.com)"
            className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.email && touched.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {validationErrors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>✕</span> {validationErrors.email}
            </p>
          )}
          {formData.email && !validationErrors.email && touched.email && (
            <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
              <span>✓</span> Valid email!
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your phone number (e.g., +1-234-567-8900)"
            className={`w-full px-4 py-3 rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validationErrors.phone && touched.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {validationErrors.phone && touched.phone && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <span>✕</span> {validationErrors.phone}
            </p>
          )}
          {formData.phone && !validationErrors.phone && touched.phone && (
            <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
              <span>✓</span> Valid phone number!
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Registering...
            </>
          ) : (
            'Complete Registration'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Your information will be kept secure and only used for event updates.
        </p>
      </div>
    </form>
  );
}