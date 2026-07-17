import ClubCard from "./ClubCard";

const clubs = [
  {
    name: "IEEE Student Branch",
    category: "Technology",
    description: "Explore innovation and technology together.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55e?w=800",
  },

  {
    name: "Photography Club",
    category: "Creative",
    description: "Capture unforgettable moments.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
  },

  {
    name: "Sports Club",
    category: "Sports",
    description: "Play, compete and stay active.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
  },
];

const FeaturedClubs = () => {
  return (
    <section
      id="clubs"
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <div className="flex justify-between items-center mb-14">

        <h2 className="text-5xl font-bold text-[#08244C]">
          Featured Clubs
        </h2>

        <button className="text-[#08244C] font-semibold hover:underline">
          View All →
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {clubs.map((club, index) => (
          <ClubCard
            key={index}
            club={club}
          />
        ))}

      </div>
    </section>
  );
};

export default FeaturedClubs;