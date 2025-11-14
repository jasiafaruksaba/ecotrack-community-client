// client/src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../Firebase/Firebase.config';
import { FaGoogle } from 'react-icons/fa';

// Password Validation Utility Function
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 6) {
    errors.push('Minimum length 6 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('At least 1 uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('At least 1 lowercase letter');
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    errors.push('At least 1 special character');
  }
  return errors;
};

const Register = () => {
  const { successToast, errorToast } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  });
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwordErrors.length > 0) {
      errorToast('Please fix password errors before submitting.');
      return;
    }

    setLoading(true);

    try {
      // 1. Create User
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // 2. Update Profile (Name & Photo URL)
      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL || 'https://via.placeholder.com/150/008000/FFFFFF?text=E', // Default avatar
      });

      successToast('Registration successful! Welcome to EcoTrack.');
      navigate('/'); // Navigate to intended route or Home
    } catch (error) {
      console.error(error);
      // Firebase error handling for display
      const errorMessage = error.code.includes('email-already-in-use')
        ? 'This email is already in use.'
        : 'Registration failed. Please try again.';
      errorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      successToast('Google registration successful! Welcome to EcoTrack.');
      navigate('/');
    } catch (error) {
      console.error(error);
      errorToast('Google registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Join EcoTrack 🌿</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Photo URL Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="photoURL">Photo URL (Optional)</label>
            <input
              type="url"
              id="photoURL"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Inline Password Errors */}
          {passwordErrors.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
              <p className="font-bold mb-1">Password Requirements:</p>
              <ul className="list-disc list-inside space-y-0.5">
                {passwordErrors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading || passwordErrors.length > 0}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
              loading || passwordErrors.length > 0
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* Google Register Button */}
        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <FaGoogle className="w-5 h-5 mr-2" />
          {loading ? 'Loading...' : 'Google Register'}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-green-600 hover:text-green-800">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;