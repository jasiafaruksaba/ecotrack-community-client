import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <img src="https://example.com/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <span className="font-bold text-lg">EcoTrack</span>
      </div>
      <div className="hidden md:flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/challenges">Challenges</Link>
        <Link to="/my-activities">My Activities</Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md">
                <p className="px-4 py-2">{user.displayName}</p>
                <Link to="/profile" className="block px-4 py-2">Profile</Link>
                <Link to="/my-activities" className="block px-4 py-2">My Activities</Link>
                <button onClick={handleLogout} className="block px-4 py-2 w-full text-left">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="bg-white text-green-600 px-4 py-2 rounded">Login</Link>
            <Link to="/register" className="bg-white text-green-600 px-4 py-2 rounded">Register</Link>
          </>
        )}
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">☰</button>
        {isOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md">
            <Link to="/" className="block px-4 py-2">Home</Link>
            <Link to="/challenges" className="block px-4 py-2">Challenges</Link>
            <Link to="/my-activities" className="block px-4 py-2">My Activities</Link>
            {user ? (
              <>
                <Link to="/profile" className="block px-4 py-2">Profile</Link>
                <button onClick={handleLogout} className="block px-4 py-2 w-full text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2">Login</Link>
                <Link to="/register" className="block px-4 py-2">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;