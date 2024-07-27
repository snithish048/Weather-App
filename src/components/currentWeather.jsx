import styles from "../css/App.module.css";
import stl from "../css/weatherCard.module.css";
import { useEffect, useState } from "react";
import sun from "../assets/SVG/sun.svg";
import upArrow from "../assets/SVG/upArrow.svg";
import downArrow from "../assets/SVG/downArrow.svg";
import humidityIcon from "../assets/SVG/humidity.svg";
import windIcon from "../assets/SVG/windIcon.svg";
import pressureIcon from "../assets/SVG/pressureIcon.svg";

export default function CurrentWeather(props) {
  const [name, setName] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [pressure, setPressure] = useState("");
  // console.log(props.lat, props.lon);

  useEffect(() => {
    async function fetchCords() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&units=${props.unit}&appid=${props.API_Key}`
      );
      const data = await res.json();
      // console.log(data);
      setName(data.name);
      setWeatherIcon(data.weather[0].icon);
      setWeather(data.weather[0].description);
      setTemp(data.main.temp);
      setFeelsLike(data.main.feels_like);
      setMinTemp(data.main.temp_min);
      setMaxTemp(data.main.temp_max);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setPressure(data.main.pressure);
    }
    // console.log(props.lat, props.lon);
    if (props.lat && props.lon) fetchCords();
  }, [props.lat, props.lon]);

  return (
    <div className={styles.container}>
      <div className={styles.CurrentWeather}>
        <div className={styles.iconContainer}>
          <div>
            <h1 className={styles.place}>{name}</h1>
            <img
              className={styles.bigIcon}
              src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
              alt="Icon"
            />
            <h1 className={styles.h1}>{weather}</h1>
          </div>
          <p className={styles.temp}>{Math.round(temp)}° </p>
        </div>
        <div>
        <div><p className={stl.weatherDesc}>Feels like {feelsLike}°</p></div>
          <div className={stl.maxMinTemp}>
          
          <p className={stl.weatherDesc}>
            <span>
              <img className={stl.arrow} src={upArrow} alt="icon" />
            </span>
            
            {maxTemp}°
            </p>
            <p className={stl.weatherDesc}>
            <span>
              <img className={stl.arrow} src={downArrow} alt="icon" />
            </span>
            {minTemp}°
          </p>
          </div>

          <p className={stl.weatherDesc}>
            <span>
              <img className={stl.icon} src={humidityIcon} alt="icon" />
            </span>
            Humidity - {humidity}%
          </p>

          <p className={stl.weatherDesc}>
            <span>
              <img className={stl.icon} src={windIcon} alt="icon" />
            </span>
            Wind - {wind}kph
          </p>

          <p className={stl.weatherDesc}>
            <span>
              <img className={stl.icon} src={pressureIcon} alt="icon" />
            </span>
            Pressure - {pressure}hPa
          </p>
        </div>
      </div>
    </div>
  );
}
