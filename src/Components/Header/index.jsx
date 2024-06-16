import logo from './logo.svg';
import './index.css'
import React, { useState } from 'react'
import { LuSunMedium } from "react-icons/lu";
import { useWeather } from '../../context/weatherContext';

const Header = (props) => {
    const weather = useWeather()
    // console.log(weather.darkMode)
    // console.log(weather.background)
    let background = weather.background

    // console.log(background)
    let websiteName = (background === 'dark') ?  'website-name' :'website-name name-dark'
  return (
    <nav className={`navbar-container ${background}`}>
      <div className='website-naming-container'>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className={`${websiteName}`}>Weather App</h1>
      </div>
      <div className='button-container'>
        <button type='button' className='theme-button' onClick={weather.onChangeMode}>
            <LuSunMedium className='sun-icon'/> Dark</button>
      </div>
    </nav>
  )
}

export default Header
