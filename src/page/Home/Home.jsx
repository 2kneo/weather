import React, { useState, useEffect } from "react";
import Loading from "../../modules/Loading/Loading";
import Search from "../../modules/Search/Search";
import WeatherItem from "../../modules/WeatherItem/WeatherItem";
import MinAndMaxWeather from "../../modules/MinAndMaxWeather/MinAndMaxWeather";
import { url } from "../../service/Service";
import "./Home.css";

const getStore = () => {
  let localStor = null;

  try {
    localStor = JSON.parse(localStorage.getItem("weather"));
  } catch (error) {
    console.log(error);
  }

  return typeof localStor === "object" && localStor !== null ? localStor : {};
};

const Home = () => {
  const [autoupdate, setAutoUpdate] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const refreshLoadData = (id, name) => {
    url(name).then((result) => {
      if (+result.cod === 200) {
        const newData = { ...getStore(), [id]: result };
        setData(newData);
        localStorage.setItem("weather", JSON.stringify(newData));
      } else {
        alert(`Error: ${result.message}`);
      }
    });
  };

  const updateAll = React.useCallback((itemsStore) => {
    const lStoreItems = Object.values(itemsStore);
    const lStoreItemsLength = lStoreItems.length;

    for (let i = 0; i < lStoreItemsLength; i++) {
      const item = lStoreItems[i];
      refreshLoadData(item.city.id, item.city.name);
    }
  }, []);

  useEffect(() => {
    const iStore = getStore();
    updateAll(iStore);
    setData(iStore);
  }, []);

  useEffect(() => {
    let intervalId = null;

    if (autoupdate) {
      intervalId = setInterval(() => {
        updateAll(getStore());
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoupdate]);

  const localStorageListCityName = (data) => {
    const arr = [];
    for (let item in data) {
      if (data.hasOwnProperty(item)) {
        arr.push(data[item].city.name);
      }
    }
    localStorage.setItem("city", JSON.stringify(arr));
  };

  const search = (e) => {
    loadingFn(true);
    const newData = {
      ...data,
      [e.city.id]: e,
    };
    setData(newData);
    localStorage.setItem("weather", JSON.stringify(newData));
    localStorageListCityName(newData);
    loadingFn(false);
  };

  const loadingFn = (e) => {
    setLoading(e);
  };

  const handleDelete = (e) => {
    loadingFn(true);
    const id = e.currentTarget.dataset.id;
    delete data[id];
    setData({ ...data });
    localStorageListCityName(data);
    localStorage.setItem("weather", JSON.stringify(data));
    loadingFn(false);
  };

  const handleRefresh = async (e) => {
    const id = e.currentTarget.dataset.id;
    const city = data[id].city.name;

    loadingFn(true);
    await url(city).then((result) => {
      if (+result.cod === 200) {
        data[id] = result;
        setData({ ...data });
        localStorage.setItem("weather", JSON.stringify(data));
      } else {
        alert(`Error: ${result.message}`);
      }
      loadingFn(false);
    });
  };

  const items = Object.values(data);

  return (
    <>
      {loading && <Loading />}
      <Search searchData={search} loadingFn={loadingFn} />

      <div className="autoUpdate">
        <label>
          <span>Автообновление 5с</span>
          <input
            type="checkbox"
            onChange={(e) => {
              setAutoUpdate(e.target.checked);
            }}
          />
        </label>
      </div>

      <div className="minAndMax">
        <>{items.length > 1 ? <MinAndMaxWeather data={items} /> : ""}</>
      </div>

      <div className="wrapper-weather">
        {items.map((item) => (
          <WeatherItem
            data={item}
            key={item.city.id}
            handleDelete={handleDelete}
            handleRefresh={handleRefresh}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
