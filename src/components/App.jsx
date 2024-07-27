import { useState, useEffect } from "react";
import styles from "../css/App.module.css";
import Header from "./header";
import WeatherCard from "./weatherCard";
import SearchedWeather from "./searchedWeather";

import bgSnow from "../assets/SVG/snow_mountain.svg";
import searchIcon from "../assets/SVG/search.svg";
import bgMountain from "../assets/SVG/brown-mountain.svg";
import bgRain from "../assets/SVG/dark_rain_cloudy.svg";
import daySky from "../assets/SVG/day-sky.svg";
import nightSky from "../assets/SVG/night-sky.svg";

export default function App() {
  const [bgImage, setBgImage] = useState(bgSnow);

  // const [ID, setID] = useState(["1264527", "2643743", "5128581"]);

  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  const [unit, setUnit] = useState("metric");
  const [clicked, setClicked] = useState(false);
  const [value, setValue] = useState("");

  const [ID, setID] = useState(() => {
    const storedValue = localStorage.getItem("city_id");
    return storedValue? JSON.parse(storedValue) : [];
  });

  const API_Key = "951f4e83ddd3f12211e4041f067f5470";

  const deleteID = (id)=>{
    setID((prevData)=>{
      const newData = prevData.filter((n)=> n !== id)
      return (newData)
    })
  }

  useEffect(() => {
    localStorage.setItem("city_id", JSON.stringify(ID));
  }, [ID]);

  
  // const changeBackground = (imageURL) => {
  //   setBgImage(imageURL);
  // };

  console.log(ID);
  return (
    <>
      <div
        className={styles.app}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Header
          unit={unit}
          setClicked={setClicked}
          value={value}
          setValue={setValue}
          API_Key={API_Key}
        />
        {ID && (
          <WeatherCard
            setID={setID}
            setCity={setCity}
            setTemp={setTemp}
            setWeather={setWeather}
            setIcon={setIcon}
            ID={ID}
            city={city}
            temp={temp}
            weather={weather}
            icon={icon}
            unit={unit}
            API_Key={API_Key}
            deleteID={deleteID}
          />
        )}
      </div>
      {clicked && (
        <SearchedWeather
          setID={setID}
          unit={unit}
          setClicked={setClicked}
          value={value}
          setValue={setValue}
          API_Key={API_Key}
        />
      )}
    </>
  );
}
