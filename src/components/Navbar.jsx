import React, { useState } from 'react';
import { Link, NavLink } from 'react-router'; // <-- ঠিক করা হয়েছে
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config'; // <-- named import

// Optional: Icons (Install: npm install lucide-react or react-icons)
import { Menu, X, Leaf } from 'lucide-react'; // <-- আইকন যোগ করা হয়েছে

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false); // মোবাইল মেনু বন্ধ
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Home</NavLink></li>
      <li><NavLink to="/challenges" className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>Challenges</NavLink></li>
      {user && (
        <li><NavLink to="/my-activities" className={({ isActive }) => isActive ? 'text-green-600 font-bold' : 'hover:text-green-600'}>My Activities</NavLink></li>
      )}
    </>
  );

  const authContent = user ? (
    <div className="relative group">
      <button className="flex items-center space-x-2 focus:outline-none">
        <img
          src={user.photoURL || 'https://via.placeholder.com/32'}
          alt={user.displayName || 'User'}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="hidden md:inline-block text-sm font-medium">{user.displayName || 'User'}</span>
      </button>

      <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <li><Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-sm">Profile</Link></li>
        <li><Link to="/my-activities" className="block px-4 py-2 hover:bg-gray-100 text-sm">My Activities</Link></li>
        <li>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <div className="flex space-x-2">
      <Link to="/login" className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 text-sm">
        Login
      </Link>
      <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
        Register
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-green-700">
          <Leaf className="w-8 h-8" />
          <span>EcoTrack</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-lg">
          {navLinks}
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:block">
          {authContent}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <ul className="space-y-2">
              {navLinks}
            </ul>
            <div className="pt-4 border-t space-y-2">
              {user ? (
                <>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setIsOpen(false)}>
                    Profile
                  </Link>
                  <Link to="/my-activities" className="block px-4 py-2 hover:bg-gray-100 rounded" onClick={() => setIsOpen(false)}>
                    My Activities
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-center px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;