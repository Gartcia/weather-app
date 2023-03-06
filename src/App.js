import "./App.css";
import Navigation from "./components/Navigation";
import ActualWeather from "./components/ActualWeather";
import FiveItems from "./components/FiveItems";
import getFormatedActualWeather from "./services/weatherServices";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  function handleLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setLocation({
          lat,
          lon,
        });
      },
      error,
      options
    );
  }
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  let [isShowing, setIsShowing] = useState(true);

  const [actualWeather, setActualWeather] = useState(null);
  const [location, setLocation] = useState({q: "Buenos Aires"});
  const [unit, setUnits] = useState("metric");

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormatedActualWeather({ ...location, units: unit }).then(
        (data) => {
          setActualWeather(data);
        }
      );
    };
    toast.promise(fetchWeather, {
      pending: "Fetching weather...",
      success: "Weather fecthed 👌",
      error: "Fetching error 🤯",
    });
    handleShow();
    function handleShow() {
      setIsShowing(false);
      resetIsShowing();
    }
    function resetIsShowing() {
      setTimeout(() => setIsShowing(true), 500);
    }
  }, [location, unit]);
  return (
    <div className="md:w-[700px] w-auto from-gray-100 bg-gradient-to-br to-blue-300 shadow-md">
      {actualWeather && (
        <div>
          <Navigation
            handleLocation={handleLocation}
            setLocation={setLocation}
            setUnits={setUnits}
            unit={unit}
            location={location}
          />
          <h1 className="text-center mb-4 text-2xl font-sans tracking-wider">
            {actualWeather.name}, {actualWeather.country}
            <br /> {actualWeather.localTime}
          </h1>
          <ActualWeather
            icon={actualWeather.icon}
            isShowing={isShowing}
            description={actualWeather.description}
            temp={actualWeather.temp}
            temp_min={actualWeather.temp_min}
            temp_max={actualWeather.temp_max}
            unit={unit}
          />
          <FiveItems title="hourly" fiveItems={actualWeather.hourly} unit={unit} />
          <FiveItems title="daily" fiveItems={actualWeather.daily} unit={unit} />
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        newestOnTop
        theme="light"
      />
    </div>
  );
}

export default App;
