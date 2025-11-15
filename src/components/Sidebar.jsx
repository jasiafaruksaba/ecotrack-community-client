import { useState } from "react";
import { Menu, X, Home, Leaf, Calendar, Info } from "lucide-react";
import { Link } from "react-router";

export default function ResponsiveSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-40">
        <h1 className="text-xl font-bold">EcoTrack</h1>
        <button onClick={() => setOpen(true)}>
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:w-60
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">EcoTrack</h2>
          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4 text-base">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
          >
            <Home /> Home
          </Link>

          <Link
            to="/challenges"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
          >
            <Leaf /> Challenges
          </Link>

          <Link
            to="/events"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
          >
            <Calendar /> Events
          </Link>

          <Link
            to="/about"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-100 transition"
          >
            <Info /> About
          </Link>
        </nav>
      </aside>
    </>
  );
}
