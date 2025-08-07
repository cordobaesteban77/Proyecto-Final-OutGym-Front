import Parallaxbk from "../components/parallax/Parallaxbk";
import CardHome from "../components/card/Cards";
import WeatherWidget from "../components/clima/OpenWeatherMap";
import GymJumbotron from "../components/jumbotron/GymJumbotron";
import MembresiaModal from "../components/membresia/MembresiaModal";
import PlanesC from "../components/planes/PlanesC";

const HomePage = () => {
  return (
    <>
      <Parallaxbk />
      <GymJumbotron />
      <WeatherWidget />
      <CardHome />
      <MembresiaModal />
      <PlanesC />
    </>
  );
};

export default HomePage;
