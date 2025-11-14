const TipCard = ({ tip }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow md:w-1/3 lg:w-1/4 m-2">
      <h3 className="text-lg font-bold">{tip.title}</h3>
      <p className="text-sm text-gray-600">By {tip.authorName}</p>
      <p className="text-sm">{tip.content.slice(0, 50)}...</p>
      <p className="text-xs">Upvotes: {tip.upvotes} | {new Date(tip.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default TipCard;