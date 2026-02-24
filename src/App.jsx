import React, { useEffect, useState } from "react";
import "./App.css";
import sunny from "./assets/sun.png";
import cloudy from "./assets/cloudy.png";
import clear from "./assets/moon-and-stars.png";
import rainy from "./assets/rainy-day.png";
import snowy from "./assets/snowy.png";
import storm from "./assets/storm.png";
import mist from "./assets/mist.png";
import windImg from "./assets/windImg.png";
import humidityImg from "./assets/humidity.png";
import getWeather from "./Secerts/api";

export default function App() {
  const [address, setAddress] = useState("City");
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("City");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("0");
  const [humidity, setHumidity] = useState("-");
  const [icon, setIcon] = useState("");
  const [windspeed, setWindspeed] = useState("-");
  const [day, setDay] = useState(true);
  const [last_updated, setLast_updated] = useState("");
  const [time, setTime] = useState("");

  async function load(location) {
    if (!location) return;
    const res = await getWeather(location);
    setData(res);
  }

  useEffect(() => {
    if (!data) return;

    console.log(data);
    setLocation(data?.location?.name);
    setWeather(data?.current?.condition?.text);
    setTemp(data?.current?.temp_c);
    setIcon(data?.current?.condition?.icon);
    setHumidity(data?.current?.humidity);
    setWindspeed(data?.current?.wind_kph);
    setLast_updated(data?.current?.last_updated);
    setDay(data?.current?.is_day === 1);
  }, [data]);

  useEffect(() => {
    console.log("here");
    if (last_updated === "") return;
    setTime(last_updated.substring(11, 16));
  }, [last_updated]);

  useEffect(() => {
    document.body.classList.toggle("dark", !day);
  }, [day]);
  const w = weather?.toLowerCase();

  let weatherImage = w?.includes("sun")
    ? sunny
    : w?.includes("clear")
      ? clear
      : w?.includes("cloud")
        ? cloudy
        : w?.includes("rain")
          ? rainy
          : w?.includes("mist")
            ? mist
            : w?.includes("snow")
              ? snowy
              : w?.includes("windy")
                ? windImg
                : w?.includes("storm") || w?.includes("thunder")
                  ? storm
                  : icon
                    ? "https:" + icon
                    : sunny;

  return (
    <div className={`app-container ${day ? "" : "dark"}`}>
      <div className="searchBar">
        <input
          className={`search ${day ? "" : "dark"}`}
          placeholder="search area"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className={`search-button ${day ? "" : "dark"}`}
          onClick={() => load(address)}
        >
          <img
            className={`search-img ${day ? "" : "dark"}`}
            src="\src\assets\search.png"
            alt="Search"
          />
        </button>
      </div>

      <img
        className={`weather-icon ${day ? "" : "dark"}`}
        key={location}
        src={weatherImage}
        alt={weather}
      />
      <div className="weather-deatails">
        <div className="temp-climate">
          <h1 className="temp" key={temp}>
            {temp}
          </h1>

          <h3 className="climate" key={location}>
            {weather}
          </h3>
        </div>

        <h3 className="loc" key={temp}>
          {location}
          <p className="time">{time}</p>
        </h3>
        <div className="humidity-windspeed" key={location}>
          <p className="humidity">
            <img className="humidityImg" src={humidityImg} />
            {`${humidity}% `}
          </p>
          <p className="windspeed">
            {`${windspeed}Kmph`}
            <img className="windImg" src={windImg} />
          </p>
        </div>
      </div>
    </div>
  );
}
