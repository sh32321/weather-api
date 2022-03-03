import React, { useState, useEffect } from "react";

const API = {
  key: "3cc3a18d8fc9e695eb058d4f38cad9b8",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  const search = (e) => {
    if (e.target.value !== "undefined") {
      fetch(`${API.base}weather?q=${input}&units=metric&APPID=${API.key}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })

        .then((result) => {
          console.log(result);
          setWeather(result);
          setInput("");
          setError(null);
        })
        .catch((error) => {
          console.log(error);
          setWeather("");
          setError("City Not Found");
        });
    }
  };
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?id=6173331&units=metric&APPID=3cc3a18d8fc9e695eb058d4f38cad9b8"
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  }, []);
  const date = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button className="btn" onClick={search}>
            Click
          </button>
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            <div className="weather-box">
              <div className="weather">{weather.weather[0].description}</div>
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="date">{date(new Date())}</div>
            </div>
          </div>
        ) : (
          ""
        )}
        <p className="error">{error}</p>
      </main>
    </div>
  );
}

export default App;
