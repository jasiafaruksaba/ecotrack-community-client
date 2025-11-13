const EventCard = ({ event }) => (
  <div className="bg-white shadow rounded p-4 hover:shadow-md transition">
    <h4 className="font-semibold">{event.title}</h4>
    <p className="text-gray-600">{new Date(event.date).toLocaleDateString()} | {event.location}</p>
    <p className="mt-1 text-gray-700">{event.description.substring(0, 80)}...</p>
  </div>
);

export default EventCard;
