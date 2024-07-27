import styles from "../css/App.module.css";
import stl from "../css/weatherCard.module.css";
import { useEffect, useState, useRef } from "react";
import sun from "../assets/SVG/sun.svg";
import upArrow from "../assets/SVG/upArrow.svg";
import downArrow from "../assets/SVG/downArrow.svg";
import humidityIcon from "../assets/SVG/humidity.svg";
import windIcon from "../assets/SVG/windIcon.svg";
import pressureIcon from "../assets/SVG/pressureIcon.svg";
import backIcon from "../assets/SVG/back.svg";
import sad from "../assets/SVG/sad.svg";

export default function SearchedWeather(props) {
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
  const [cityID, setCityID] = useState("");

  const back = () => {
    props.setClicked(false);
    props.setValue("");
  };

  const addItem = () => {
    const id = cityID.toString();
    props.setID((prevData) => {
      if (prevData.includes(id)) {
        return;
      } else {
        return [...prevData, id];
      }
    });
    props.setClicked(false);
    props.setValue("");
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${props.value}&appid=${props.API_Key}&units=${props.unit}`
      );
      const data = await res.json();
      console.log(data);
      setName(data.city.name);
      setCityID(data.city.id);
      setWeatherIcon(data.list[0].weather[0].icon);
      setWeather(data.list[0].weather[0].description);
      setTemp(data.list[0].main.temp);
      setFeelsLike(data.list[0].main.feels_like);
      setMinTemp(data.list[0].main.temp_min);
      setMaxTemp(data.list[0].main.temp_max);
      setHumidity(data.list[0].main.humidity);
      setWind(data.list[0].wind.speed);
      setPressure(data.list[0].main.pressure);
    }
    fetchData();
  }, []);
  console.log(cityID);

  return (
    <div className={styles.overlay}>
      <div className={styles.searchedWeather}>
        <div className={styles.button}>
          <img
            className={styles.backButton}
            onClick={back}
            src={backIcon}
            alt="icon"
          />
          <p className={styles.backButton}></p>{" "}
        </div>
        {name ? (
          <div className={styles.searchedWeatherContainer}>
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
              <p className={styles.temp}>{Math.round(temp)}°</p>
            </div>
            <div>
              <p className={stl.weatherDesc}>
                <span>
                  <img className={stl.icon} src={upArrow} alt="icon" />
                </span>
                {maxTemp}°
                <span>
                  <img className={stl.icon} src={downArrow} alt="icon" />
                </span>
                {minTemp}°
              </p>

              <p className={stl.weatherDesc}>
                <span>
                  <img className={stl.icon} src={humidityIcon} alt="icon" />
                </span>
                Humidity {humidity}%
              </p>

              <p className={stl.weatherDesc}>
                <span>
                  <img className={stl.icon} src={windIcon} alt="icon" />
                </span>
                Wind {wind}kph
              </p>

              <p className={stl.weatherDesc}>
                <span>
                  <img className={stl.icon} src={pressureIcon} alt="icon" />
                </span>
                Pressure {pressure}hPa
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.cityNotFound}>City not found <div><img className={styles.sad} src={sad} alt="icon" /></div></div>
        )}
        {name && <div className={styles.addContainer}>
          <button onClick={addItem} className={styles.addButton}>
            Add City
          </button>
        </div>}
      </div>
    </div>
  );
}
