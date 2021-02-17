import React from "react";
import {
  faSnowflake,
  faSun,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimeConvert } from "../TimeConvert/TimeConvert";
import "./WeatherItem.css";

const WeatherItem = ({ data, handleDelete, handleRefresh }) => {
  const lastData = data.list[0];

  const icons = (e) => (e <= 0 ? faSnowflake : faSun);

  return (
    <div className="item" key={data.city.id}>
      <h4>Город: {data.city.name}</h4>
      <p>
        Температуру: {Math.round(lastData.main.temp)}
        <sup>o</sup>C{" "}
        <FontAwesomeIcon
          className={lastData.main.temp < 0 ? "down" : "up"}
          icon={icons(lastData.main.temp)}
        />
      </p>
      <p>Влажность: {lastData.main.humidity}%</p>
      <p>Атмосферное давление: {lastData.main.pressure}</p>
      <p>
        Сила и направление ветра: {lastData.wind.speed}М/C -{" "}
        <FontAwesomeIcon
          className="red"
          icon={faArrowDown}
          style={{ transform: `rotate(${lastData.wind.deg}deg)` }}
        />
      </p>
      <p>Последнее обновление данных: {TimeConvert(lastData.dt)}</p>

      {handleDelete && (
        <button
          className="delete"
          data-id={data.city.id}
          onClick={handleDelete}
        >
          Удалить
        </button>
      )}
      {handleRefresh && (
        <button data-id={data.city.id} onClick={handleRefresh}>
          Обновить
        </button>
      )}
    </div>
  );
};

export default WeatherItem;
