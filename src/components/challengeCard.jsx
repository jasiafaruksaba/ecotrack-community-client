import { Link } from 'react-router';

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow md:w-1/3 lg:w-1/4 m-2">
      <img src={challenge.imageUrl} alt={challenge.title} className="w-full h-32 object-cover rounded-t-lg" />
      <h3 className="text-lg font-bold mt-2">{challenge.title}</h3>
      <p className="text-sm text-gray-600">{challenge.category}</p>
      <p className="text-sm">{challenge.description.slice(0, 50)}...</p>
      <p className="text-xs">Participants: {challenge.participants}</p>
      <Link to={`/challenges/${challenge._id}`} className="bg-green-500 text-white px-4 py-2 rounded mt-2 block text-center">View</Link>
    </div>
  );
};

export default ChallengeCard;