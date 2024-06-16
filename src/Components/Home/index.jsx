import React, { useState } from 'react'
import './index.css'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FcGlobe } from "react-icons/fc";
import { GiSunrise,GiWindsock } from "react-icons/gi";
import { BsSunsetFill } from "react-icons/bs";
import { FaCloudShowersHeavy,FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity,WiBarometer } from "react-icons/wi";
import { RiTimeZoneLine } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6";
import { useWeather } from '../../context/weatherContext';
import Header from '../Header'


const Home = (props) => {
    const themeInputs = useWeather()
    const [weather, setWeather] = useState(null)
    const [userInput, setUserInput] = useState('')
    const API_KEY = 'b45eba78c010dc5bdf5872dfccebeddc'
    // console.log(API_KEY)

    let background = themeInputs.background
    // console.log(background)

    const weatherContentView = () => {
        return(
            weather !== null ? (
            <div className={`weather-card ${background}`}>
                <p><span>City Name </span>: <span className='weather-output'><MdOutlineDriveFileRenameOutline className='icon'/>{weather.name}</span></p>
                <p><span>Country </span>: <span className='weather-output'><FcGlobe className='icon'/>{weather.sys?.country}</span></p>
                <p><span>Sunrise </span>: <span className='weather-output'><GiSunrise className='icon sunrise'/>{weather.sys?.sunrise}</span></p>
                <p><span>Sunset </span>: <span className='weather-output'><BsSunsetFill className='icon sunset'/>{weather.sys?.sunset}</span></p>
                <p><span>Weather Des </span>: <span className='weather-output'>{weather.weather[0]?.description}</span></p>
                <p><span>Clouds </span>: <span className='weather-output'><FaCloudShowersHeavy className='icon clouds'/>{weather.clouds?.all}</span></p>
                <p><span>Humidity </span>: <span className='weather-output'><WiHumidity className='icon humidity'/>{weather.main?.humidity}</span></p>
                <p><span>Pressure </span>: <span className='weather-output'><WiBarometer className='icon'/>{weather.main?.pressure}</span></p>
                <p><span>Temperature </span>: <span className='weather-output'><FaTemperatureHigh className='icon temp'/>{weather.main?.temp}</span></p>
                <p><span>Wind speed & Deg </span>: <span className='weather-output'><GiWindsock className='icon wind'/>{weather.wind?.speed}</span> & <span className='weather-output'>{weather.wind?.deg}</span></p>
                <p><span>Time Zone </span>: <span className='weather-output'><RiTimeZoneLine className='icon'/>{weather.timezone}</span></p>
                <p><span>Location Co-ordinates </span>: <span className='weather-output'><FaMapLocationDot className='icon'/>{weather.coord?.lat}</span> & <span className='weather-output'>{weather.coord?.lon}</span></p>
            </div>): null
        )
    }

    
    // <p>Date & Time: {new Date()}</p>
    // b45eba78c010dc5bdf5872dfccebeddc

    const getWeatherData = async() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${API_KEY}`
        // console.log(url)
        const options = {
            method: 'GET'
        }
        const response = await fetch(url, options)
        if(response.ok){
            const data = await response.json()
            console.log(data)
            setWeather(data)
        }else{
            console.log(error.message)
        }
    }

    const onChangeSearch = (event) =>{
        const inputValue = event.target.value
        setUserInput(inputValue)
    }

    const onEnter = (event) => {
        if(event.key === 'Enter'){
            setUserInput(event.target.value)
            getWeatherData()
        }
    }

  return (
    <>
    <Header/>
    <div className='home-primary-container'>
      <div className='content-box' >
        <h1 className={`content-name ${background}`}>Location</h1>
        <div className='search-container'>
            <input type='search' className='search-input' onKeyDown={onEnter} onChange={onChangeSearch} placeholder='Enter City Name...'/>
            <button type='button' className='search-button' onClick={getWeatherData}>Search</button>
        </div>
        {weatherContentView()}
      </div>
    </div>
    </>
  )
}

export default Home
