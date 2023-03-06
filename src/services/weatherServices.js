import { DateTime } from "luxon";

const API_KEY = "fc5b50d77ede3bba61da67f7e477e0df";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherInfo = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

function formatActualWeather(data) {
  const {
    coord: { lat, lon },
    weather,
    main: { temp, temp_min, temp_max },
    sys: { country },
    timezone,
    name,
  } = data;
  const { description, icon } = weather[0];
  return {
    lat,
    lon,
    description,
    icon,
    temp,
    temp_min,
    temp_max,
    country,
    timezone,
    name,
  };
}

function formatToLocal(from, format = "ccc, dd LLL") {
  return DateTime.fromFormat(`${from}`, `yyyy-MM-dd hh:mm:ss`).toFormat(format);
}

const formatForecastWeather = (data) => {
  const datalist = [...data.list];
  const localTime = formatToLocal(datalist[0].dt_txt);
  const hourly = datalist.slice(0, 5).map((d) => {
    return {
      icon: d.weather[0].icon,
      temp: d.main.temp,
      moment: formatToLocal(d.dt_txt, "hh a"),
    };
  });
  const daily = [
    {
      icon: datalist[8].weather[0].icon,
      temp: datalist[8].main.temp,
      moment: formatToLocal(datalist[8].dt_txt, "ccc"),
    },
    {
      icon: datalist[16].weather[0].icon,
      temp: datalist[16].main.temp,
      moment: formatToLocal(datalist[16].dt_txt, "ccc"),
    },
    {
      icon: datalist[24].weather[0].icon,
      temp: datalist[24].main.temp,
      moment: formatToLocal(datalist[24].dt_txt, "ccc"),
    },
    {
      icon: datalist[32].weather[0].icon,
      temp: datalist[32].main.temp,
      moment: formatToLocal(datalist[32].dt_txt, "ccc"),
    },
    {
      icon: datalist[39].weather[0].icon,
      temp: datalist[39].main.temp,
      moment: formatToLocal(datalist[39].dt_txt, "ccc"),
    },
  ];
  return { localTime, daily, hourly };
};

const getFormatedActualWeather = async (searchParams) => {
  const formatedActualWeather = await getWeatherInfo(
    "weather",
    searchParams
  ).then((data) => formatActualWeather(data));

  const { lat, lon } = formatedActualWeather;

  const formatedForecastWeather = await getWeatherInfo("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((data) => formatForecastWeather(data));

  return { ...formatedActualWeather, ...formatedForecastWeather };
};

function iconURLfromCode(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

export default getFormatedActualWeather;

export { iconURLfromCode};
