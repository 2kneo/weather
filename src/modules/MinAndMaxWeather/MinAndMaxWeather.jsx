import React, { useEffect, useState } from "react";
import {
  faTemperatureLow,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MinAndMaxWeather.css";

const MinAndMaxWeather = ({ data }) => {
  const [newData, setNewData] = useState(null);

  useEffect(() => {
    if (data.length < 2) {
      return false;
    }
    minAndMax();
  }, [data]);

  const minAndMax = () => {
    let citiesTemperature = {};
    for (const idCity of Object.keys(data)) {
      citiesTemperature[idCity] = 0;

      if (data[idCity].hasOwnProperty("list") && data[idCity].list.length > 0) {
        let metadata = data[idCity].list[0];

        if (metadata.hasOwnProperty("main")) {
          if (metadata.main.hasOwnProperty("temp")) {
            citiesTemperature[idCity] = metadata.main.temp;
          }
        }
      }
    }

    let ciriesWithMaxMinTemperature = {
      maxTemperature: null,
      minTemperature: null,
    };

    let maxTemperature = null;
    let minTemperature = null;

    for (const idCity of Object.keys(citiesTemperature)) {
      if (maxTemperature === null || minTemperature === null) {
        maxTemperature = parseFloat(citiesTemperature[idCity]);
        minTemperature = parseFloat(citiesTemperature[idCity]);

        ciriesWithMaxMinTemperature.maxTemperature = idCity;
        ciriesWithMaxMinTemperature.minTemperature = idCity;
      }

      if (parseFloat(citiesTemperature[idCity]) > maxTemperature) {
        maxTemperature = parseFloat(citiesTemperature[idCity]);
        ciriesWithMaxMinTemperature.maxTemperature = idCity;
      }

      if (parseFloat(citiesTemperature[idCity]) < minTemperature) {
        minTemperature = parseFloat(citiesTemperature[idCity]);
        ciriesWithMaxMinTemperature.minTemperature = idCity;
      }
    }

    if (ciriesWithMaxMinTemperature.maxTemperature) {
      ciriesWithMaxMinTemperature.maxTemperature =
        data[ciriesWithMaxMinTemperature.maxTemperature];
    }

    if (ciriesWithMaxMinTemperature.minTemperature) {
      ciriesWithMaxMinTemperature.minTemperature =
        data[ciriesWithMaxMinTemperature.minTemperature];
    }

    setNewData(ciriesWithMaxMinTemperature);
  };

  const item = (e) => {
    if (!e) {
      return false;
    }

    return (
      <span key={e.city.id} className="temp">
        <FontAwesomeIcon
          className={e.list[0].main.temp >= 0 ? "up" : "down"}
          icon={e.list[0].main.temp >= 0 ? faTemperatureHigh : faTemperatureLow}
          size={"lg"}
        />{" "}
        <strong>{e.city.name}</strong>:{" "}
        <i>
          {Math.round(e.list[0].main.temp)} <sup>o</sup>C
        </i>
      </span>
    );
  };

  return (
    <>
      {newData && (
        <>
          {item(newData.minTemperature)}
          {item(newData.maxTemperature)}
        </>
      )}
    </>
  );
};

export default MinAndMaxWeather;
