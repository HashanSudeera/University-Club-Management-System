const EventCard = ({ event }) => {
  return (
    <div className="bg-[#14335F] rounded-3xl p-6 flex items-center gap-6 hover:scale-[1.02] transition duration-300">
      {/* Date */}
      <div className="bg-[#E7C65A] rounded-2xl w-24 h-24 flex flex-col justify-center items-center flex-shrink-0">
        <span className="text-sm font-semibold text-[#14335F] uppercase">
          {event.month}
        </span>

        <h2 className="text-4xl font-bold text-[#14335F]">{event.day}</h2>
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-white">{event.title}</h3>

        <p className="text-gray-300 mt-2">{event.description}</p>

        <div className="flex flex-wrap gap-6 mt-5 text-gray-200 text-sm">
          <span>🕒 {event.time}</span>

          <span>📍 {event.location}</span>
        </div>
      </div>

      {/* Button */}
      <button className="hidden md:block bg-white text-[#14335F] px-6 py-3 rounded-full font-semibold hover:bg-[#E7C65A] transition">
        Register
      </button>
    </div>
  );
};

export default EventCard;
