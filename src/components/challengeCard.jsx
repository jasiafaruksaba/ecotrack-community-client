// import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

const ChallengeCard = ({ challenge }) => {
  const [joined, setJoined] = useState(false);

  const handleJoin = async () => {
    try {
      const token = localStorage.getItem("firebaseToken");
      await axios.post(`/api/challenges/join/${challenge._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJoined(true);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="bg-white shadow rounded overflow-hidden hover:shadow-md transition p-4">
      <img src={challenge.imageUrl} alt={challenge.title} className="w-full h-40 object-cover"/>
      <h3 className="font-semibold text-lg mt-2">{challenge.title}</h3>
      <p className="text-gray-600">{challenge.category}</p>
      <p className="mt-1 text-gray-700">{challenge.description.substring(0, 60)}...</p>
      <div className="mt-2 flex gap-2">
        <Link to={`/challenges/${challenge._id}`} className="text-green-600 hover:underline">View</Link>
        {!joined && <button onClick={handleJoin} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Join</button>}
        {joined && <span className="text-gray-600">Joined ✅</span>}
      </div>
    </div>
  );
};

export default ChallengeCard;
