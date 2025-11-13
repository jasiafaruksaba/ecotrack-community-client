const TipCard = ({ tip }) => (
  <div className="bg-white shadow rounded p-4 hover:shadow-md transition">
    <h4 className="font-semibold">{tip.title}</h4>
    <p className="text-gray-600 mt-1">{tip.content.substring(0, 80)}...</p>
    <div className="text-gray-500 mt-2 text-sm">By {tip.authorName}</div>
  </div>
);

export default TipCard;
