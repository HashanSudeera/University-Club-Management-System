import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import FeaturedClubs from "../components/FeaturedClubs";
import UpcomingEvents from "../components/UpcomingEvents";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedClubs />
      <UpcomingEvents />
    </>
  );
};

export default Home;
