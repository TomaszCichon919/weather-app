import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../../components/ErrorBox/ErrorBox'

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const handleCityChange = useCallback ((city) => {
    setErrorStatus(false);
  console.log('city', city)
  setPending(true);
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=46380407f760947a47023563a77b0a84&units=metric`)
  .then(res => {
    if(res.status === 200) {
      return res.json()
        .then(data => {
          setPending(false);
    console.log('is that it?', data);
    setWeatherData({
        city: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].main
      })
        })
      } else {
        setErrorStatus(true);
      }
  });

}, []);
  return (
    <section>
      <PickCity action = {handleCityChange}/>
      { (weatherData && !pending && !errorStatus) && <WeatherSummary city = {weatherData.city} temp = {weatherData.temp} description={weatherData.description} 
       icon = {weatherData.icon} />}
      {(pending && !errorStatus) && <Loader />}
      {(errorStatus) && <ErrorBox/>}
    </section>
  )
};

export default WeatherBox;

//const weatherData = {
  //   city: data.name,
  //   temp: data.main.temp,
  //   icon: data.weather[0].icon,
  //   description: data.weather[0].main
  // };

  // city = {weatherData.city} temp = {weatherData.main.temp} 
  //     icon = {weatherData.icon} description = {weatherData.weather[0].main}