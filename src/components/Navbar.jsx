// import { Link } from "react-router-dom";

import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="border-b bg-white">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-green-600">
          EcoTrack
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/challenges" className="hover:text-green-600">Challenges</Link>
          <Link to="/my-activities" className="hover:text-green-600">My Activities</Link>
          <Link to="/login" className="px-4 py-2 border rounded-md hover:bg-green-600 hover:text-white">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
