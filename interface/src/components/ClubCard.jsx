const ClubCard = ({ club }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">

      <img
        src={club.image}
        alt={club.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">

        <span className="bg-yellow-400 text-xs px-3 py-1 rounded-full">
          {club.category}
        </span>

        <h3 className="mt-5 text-2xl font-bold text-[#08244C]">
          {club.name}
        </h3>

        <p className="text-gray-500 mt-3">
          {club.description}
        </p>

        <button className="mt-6 w-full border rounded-full py-3 hover:bg-[#08244C] hover:text-white transition">
          View Details
        </button>

      </div>

    </div>
  );
};

export default ClubCard;