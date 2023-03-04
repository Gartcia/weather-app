import { useState } from "react";
import sunLogo from "../svg/sun-svgrepo-com.svg";
export default function Navigation(props) {
  const [newLocation, setNewLocation] = useState("")
  function handleLocationChange(e){
    if(e !== "" && e !== props.location){
      props.setLocation(e);
    }
  }
  function handleKey(e){
    const keyCode = e.keyCode;
    if(keyCode === 13){
      handleLocationChange(newLocation);
    }
  }
  function handleUnits(e) {
    switch (e) {
      case "C":
        props.setUnits("metric");
        break;
      case "F":
        props.setUnits("imperial");
        break;
      default:
        props.setUnits(props.unit);
        break;
    }
  }
  return (
    <div className="flex justify-evenly items-center p-6">
      <img className="w-8" src={sunLogo} alt="app-logo" />
      <div className="flex items-center rounded-md bg-slate-50 p-1 mx-1 transition-all hover:shadow-xl hover:scale-105 focus-within:scale-105 focus-within:shadow-xl">
        <input
          type="text"
          className="border-r-2 border-gray-400 m-1 bg-transparent outline-none font-sans text-gray-600"
          placeholder="Search a city..."
          value={newLocation}
          onChange={(e)=> setNewLocation(e.currentTarget.value)}
          onKeyUp={(e) => handleKey(e)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-400 cursor-pointer"
          tabIndex={0}
          onClick={() => handleLocationChange(newLocation)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <p className="m-0 p-0 text-lg font-sans font-extralight text-gray-600">
        <span className="mx-1 cursor-pointer transition-all md:text-lg text-sm hover:text-xl tracking-wider" onClick={() => handleUnits("C")}>°C</span>
        <span className="mx-1 cursor-pointer transition-all md:text-lg text-sm hover:text-xl tracking-wider" onClick={() => handleUnits("F")}>°F</span>
      </p>
    </div>
  );
}
