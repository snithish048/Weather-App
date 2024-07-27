import { useEffect, useState } from "react";
import styles from "../css/App.module.css";
import CurrentWeather from "./currentWeather";
import SearchedWeather from "./searchedWeather";

import locationIcon from "../assets/SVG/location.svg";
import sun from "../assets/SVG/sun.svg";

export default function Header(props) {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    console.log("Geolocation not supported");
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // console.log(latitude, longitude);
    setLat(latitude);
    setLon(longitude);
  }

  const handleClick = () => {
    if (props.value.length > 2) {
      props.setClicked(true);
    }
  };

  const handleChange = (e) => {
    props.setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      props.setClicked(true);
    }
  };

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.headContainer}>
          <img className={styles.location} src={sun} alt="Location" />
          <h1 className={styles.heading}>WEATHER TODAY</h1>
        </div>

        <input
          className={styles.searchBar}
          placeholder="Enter the city name"
          onChange={(e) => handleChange(e)}
          value={props.value}
          onKeyDown={handleKeyDown}
        />
        {/* <button onClick={handleClick}>Search</button> */}
      </div>
      {lat && lon && <CurrentWeather lat={lat} lon={lon} {...props} />}
    </>
  );
}
