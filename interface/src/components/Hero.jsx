import hero from "../assets/hero.jpg";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <h1 className="text-6xl font-extrabold leading-tight text-[#08244C]">
            Connect,
            <br />
            Lead,
            <br />
            <span className="text-[#A38A56]">
              and Grow.
            </span>
          </h1>

          <p className="mt-8 text-gray-600 text-lg max-w-lg">
            Join university clubs, discover exciting events,
            develop leadership skills and connect with students.
          </p>

          <button className="mt-10 bg-[#08244C] text-white px-8 py-4 rounded-full hover:bg-blue-900 transition">
            Explore Clubs
          </button>

        </div>

        <div>

          <img
            src={hero}
            alt=""
            className="rounded-[40px] shadow-2xl w-full h-[500px] object-cover"
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;