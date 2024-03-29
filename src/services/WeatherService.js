import { DateTime } from "luxon";

const API_KEY = "253682c0bd759acfb4255d4aa08c3dd7";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url)
        .then((res) => res.json())
};

const formatCurrentweather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp,feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data;

    const {main:details ,icon} = weather[0];

    return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,sunset, details, icon, speed}
}

const formatForecastWeather = (data) => {
    let {timezone, daily}  = data;
    daily = daily.slice(1,6).map(d => {
        return {
            title: formatToLocalTime(d.dt,timezone, 'dd LLL'),
            temp: d.temp.day,
            icon: d.weather[0].icon,
            weather: d.weather[0]
        }
    })

    return {timezone, daily};
}
 
const  getFormattedWeatherData = async (searchParams) =>{
    const formattedCurrentWeather = await getWeatherData('weather',searchParams).then(formatCurrentweather);

    const {lat,lon} = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall',{
        lat, lon, exclude:'current,minutely,alerts', units: searchParams.units
    }).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather};
}
const formatToLocalTime = (secs,zone,format="cccc, dd LLL yyyy'| Local Time:'hh:mm a'") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>   `http://openweathermap.org/img/wn/${code}@2x.png`;


export default getFormattedWeatherData;
export {formatToLocalTime, iconUrlFromCode};

