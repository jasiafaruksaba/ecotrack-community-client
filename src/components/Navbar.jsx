// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Leaf, Menu, X } from 'lucide-react'; // Eco Icon

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const onLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/challenges', label: 'Challenges' },
    { to: '/my-activities', label: 'My Activities' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 tracking-tight">EcoTrack</div>
                <div className="text-xs text-gray-500 hidden sm:block">Community for a greener life</div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex flex-1 justify-center">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    relative text-base font-medium transition-all duration-200
                    ${isActive(link.to)
                      ? 'text-emerald-600'
                      : 'text-gray-700 hover:text-emerald-600'
                    }
                  `}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-600 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Auth + Mobile Menu Button */}
          <div className="flex items-center gap-3">

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL || `https://avatars.dicebear.com/api/identicon/${user.uid}.svg`}
                    alt="avatar"
                    className="w-9 h-9 rounded-full ring-2 ring-emerald-200"
                  />
                  <span className="text-sm font-medium text-gray-700 max-w-32 truncate">
                    {user.displayName || user.email}
                  </span>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 hover:shadow-md transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive('/login')
                        ? 'bg-yellow-400 text-gray-900'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }
                    `}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive('/register')
                        ? 'bg-yellow-400 text-gray-900'
                        : 'bg-emerald-500 text-white hover:bg-emerald-600'
                      }
                    `}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`
                  block py-2 px-3 rounded-lg text-base font-medium
                  ${isActive(link.to)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-3">
                    <img
                      src={user.photoURL || `https://avatars.dicebear.com/api/identicon/${user.uid}.svg`}
                      alt="avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">
                        {user.displayName || user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg caption-emerald-700 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full px-4 py-2 bg-emerald-600 text-white rounded-lg text-center font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="block w-full px-4 py-2 bg-emerald-500 text-white rounded-lg text-center font-medium"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}