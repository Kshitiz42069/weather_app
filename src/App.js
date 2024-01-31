import React, { useEffect, useState } from "react";
import './App.css'
import Header from "./components/Header";
import Input from "./components/Input";
import TimeandLocation from "./components/TimeandLocation";
import Temperature from "./components/Temperature";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/WeatherService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const [query, setQuery] = useState({q: 'delhi'})
  const [units,setUnits] = useState('metric')
  const [weather,setWeather] = useState(null);

  const formatBG = () => {
    if(!weather) return 'from-cyan-700 to-blue-700'

    const threshold =units === 'metric' ? 20: 60;

    if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }

  useEffect(()=> {
    const fetchWeather = async() => {

      const message = query.q ? query.q : 'current location'
      toast.info('Fetching weather for ' + message)

      await getFormattedWeatherData({...query,units}).then(data => {

        toast.success(`successfully fetched weather for ${data.name}, ${data.country}`)

        setWeather(data);
      });

    }
  
    fetchWeather();
  },[query,units]);

  return (
    <div className={`max-w-full pt-5 pb-20 lg:px-32 sm:px-[2.5rem] bg-gradient-to-br  h-full shadow-xl shadow-gray-400 ${formatBG()}`}>
      <Header setQuery = {setQuery}/>
      <Input setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather &&  (
        <div>
          <TimeandLocation weather={weather}/>
          <Temperature weather={weather}/>
          <Forecast title="Daily Forecast" items={weather.daily}/>
        </div>
      )}
      
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true}/>
    </div>
    
  );
}

export default App;
