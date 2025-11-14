const Sidebar = () => {
  return (
    <div className="bg-gray-200 p-4 w-64 hidden md:block">
      <Link to="/my-activities">My Challenges</Link>
      {/* More links */}
    </div>
  );
};

export default Sidebar;