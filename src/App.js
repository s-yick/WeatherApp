import './App.css';
import {useState} from "react";



const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

const date = new Date();
var time = date.getHours()

let currentClassName;

if(time > 19 || time < 6){
  currentClassName = "app night"
}
else if (time > 6 && time < 17){
  currentClassName = "app day"
}
else{
  currentClassName = "app evening"
}


function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = event =>{

    if(event.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          .then(res => res.json())
          .then(result =>{
              setWeather(result);
              setQuery('');
              console.log(result);
    });


    }

  }

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();


    return(`${day} ${date} ${month} ${year}`)
  }

  return (
      <div className= {`app ${currentClassName}`}>

        <main>

          <div className="search-box">

            <input
                type = "text"
                className="search-bar"
                placeholder="Search..."

                onChange={e=> setQuery(e.target.value)}
                value = {query}
                onKeyPress={search}

            />



          </div>



          {(typeof weather.main != "undefined")?(

          <div>

          <div className="location-box">

            <div className="location">{weather.name}, {weather.sys.country}</div>

            <div className="date">{dateBuilder(new Date)}</div>

          </div>

          <div className="weather-box">

            <div className={"temp"}>{Math.round(weather.main.temp)}°c</div>
            <div className={"weather"}>{weather.weather[0].main}</div>


            </div>
            </div>

            ):('')}


        </main>

        </div>

  ); }

export default App;
