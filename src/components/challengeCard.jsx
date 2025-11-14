import React from "react";
import { Link } from "react-router";

export default function ChallengeCard({ challenge }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img src={challenge.imageUrl || "/placeholder.jpg"} alt={challenge.title} className="h-40 w-full object-cover rounded" />
      <h3 className="mt-3 font-semibold">{challenge.title}</h3>
      <p className="text-sm text-gray-600">{challenge.category} — {challenge.duration} days</p>
      <p className="text-sm mt-2 truncate">{challenge.description}</p>
      <div className="mt-auto flex items-center justify-between pt-3">
        <div className="text-xs text-gray-500">{challenge.participants} participants</div>
        <Link to={`/challenges/${challenge._id}`} className="text-sm btn">View</Link>
      </div>
    </div>
  );
}
