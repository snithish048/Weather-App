import styles from "../css/weatherCard.module.css";
import { useEffect, useState } from "react";
import upArrow from "../assets/SVG/upArrow.svg";
import downArrow from "../assets/SVG/downArrow.svg";
import humidityIcon from "../assets/SVG/humidity.svg";
import windIcon from "../assets/SVG/windIcon.svg";
import pressureIcon from "../assets/SVG/pressureIcon.svg";

export default function WeatherCard(props) {
  return (
    <div className={styles.cardContainer}>
      {props.ID.map((id) => (
        <WeatherDetails key={id} cityID={id} {...props} />
      ))}
    </div>
  );
}

function WeatherDetails(props) {
  const [value, setValue] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [pressure, setPressure] = useState("");

  

  let URL = `https://api.openweathermap.org/data/2.5/weather?id=${props.cityID}&units=${props.unit}&appid=${props.API_Key}`;

  const handleDelete = () =>{
    props.deleteID(props.cityID)
  }

  useEffect(() => {
    async function fetchWeather() {
      const res = await fetch(URL);
      const data = await res.json();
      setValue(data.name);
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
    fetchWeather();
  }, []);

  return (
    <div className={styles.weatherCard}>
      <h1>{value}</h1>
      
      <div className={styles.tempContainer}>
        
          <img
            className={styles.wIcon}
            src={`http://openweathermap.org/img/w/${weatherIcon}.png`}
            alt="Icon"
          />
          <p className={styles.temperature}>{Math.round(temp)}°</p>
      </div>
      <div className={styles.weather}>
          <p>{weather}</p>
        </div>

      <div className={styles.descDiv}>
      <p className={styles.weatherDesc}>Feels like {feelsLike}°</p>
       
        <div className={styles.weatherDescContainer}>
          <p className={styles.weatherDesc}>
            <span>
              <img className={styles.icon} src={upArrow} alt="icon" />
            </span>
            {maxTemp}°
            <span>
              <img className={styles.icon} src={downArrow} alt="icon" />
            </span>
            {minTemp}°
          </p>

          <p className={styles.weatherDesc}>
            <span>
              <img className={styles.icon} src={humidityIcon} alt="icon" />
            </span>
            Humidity {humidity}%
          </p>

          <p className={styles.weatherDesc}>
            <span>
              <img className={styles.icon} src={windIcon} alt="icon" />
            </span>
            Wind {wind}kph
          </p>

          <p className={styles.weatherDesc}>
            <span>
              <img className={styles.icon} src={pressureIcon} alt="icon" />
            </span>
            Pressure {pressure}hPa
          </p>
        </div>
        
      </div>
      <div className={styles.deleteContainer}><button className={styles.deleteButton} onClick={handleDelete}>Delete</button></div>
    </div>
  );
}
