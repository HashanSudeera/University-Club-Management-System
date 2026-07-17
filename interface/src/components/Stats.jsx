const stats = [
  {
    number: "1.2k+",
    title: "Active Students",
  },
  {
    number: "50",
    title: "Student Clubs",
  },
  {
    number: "10",
    title: "Weekly Events",
  },
];

const Stats = () => {
  return (
    <section className="bg-[#F1F2F6] py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-10">

        {stats.map((item, index) => (
          <div key={index}>

            <h2 className="text-5xl font-bold text-[#08244C]">
              {item.number}
            </h2>

            <p className="text-gray-600 mt-2 text-lg">
              {item.title}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Stats;