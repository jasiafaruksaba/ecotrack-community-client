// client/src/pages/PagesError.jsx
import React from 'react';
import { Link } from 'react-router';


const PagesError = () => {
  return (
   
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-gray-50 text-center p-6">
      <h1 className="text-9xl font-extrabold text-green-600">404</h1>
      <h2 className="text-4xl font-bold text-gray-800 mt-4 mb-3">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The sustainable path you were looking for doesn't seem to exist here.
      </p>
      
      <Link 
        to="/" 
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
   
  );
};

export default PagesError;