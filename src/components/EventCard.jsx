const EventCard = ({ event }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow md:w-1/3 lg:w-1/4 m-2">
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-sm">{event.location}</p>
      <p className="text-sm">{event.description.slice(0, 50)}...</p>
      <p className="text-xs">Participants: {event.currentParticipants}/{event.maxParticipants}</p>
    </div>
  );
};

export default EventCard;