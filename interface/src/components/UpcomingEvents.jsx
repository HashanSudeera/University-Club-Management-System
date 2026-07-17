import EventCard from "./EventCard";

const events = [
  {
    month: "OCT",
    day: "24",
    title: "Tech Innovation Summit",
    description:
      "Join industry experts and students for workshops, networking, and innovation talks.",
    time: "9:00 AM",
    location: "Main Auditorium",
  },

  {
    month: "OCT",
    day: "26",
    title: "Photography Exhibition",
    description:
      "Explore amazing student photography and creative artwork from university members.",
    time: "2:00 PM",
    location: "Art Gallery",
  },
];

const UpcomingEvents = () => {
  return (
    <section
      id="events"
      className="py-24 px-6"
    >
      <div className="max-w-7xl mx-auto bg-[#08244C] rounded-[40px] p-12">

        <div className="flex justify-between items-center flex-wrap gap-4">

          <div>

            <h2 className="text-5xl font-bold text-white">
              Upcoming Events
            </h2>

            <p className="text-[#E7C65A] mt-3">
              Mark your calendar and don't miss these exciting events.
            </p>

          </div>

          <button className="bg-white text-[#08244C] px-6 py-3 rounded-full font-semibold hover:bg-[#E7C65A] transition">
            View All
          </button>

        </div>

        <div className="space-y-8 mt-14">

          {events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
            />
          ))}

        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;