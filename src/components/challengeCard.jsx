// import { Link } from "react-router-dom";

import { Link } from "react-router";

const ChallengeCard = ({ challenge }) => (
  <div className="bg-white shadow rounded overflow-hidden hover:shadow-md transition">
    <img src={challenge.imageUrl} alt={challenge.title} className="w-full h-40 object-cover"/>
    <div className="p-4">
      <h3 className="font-semibold text-lg">{challenge.title}</h3>
      <p className="text-gray-600">{challenge.category}</p>
      <p className="mt-2 text-gray-700">{challenge.description.substring(0, 60)}...</p>
      <Link to={`/challenges/${challenge._id}`} className="text-green-600 mt-2 block hover:underline">View Challenge</Link>
    </div>
  </div>
);

export default ChallengeCard;
