import React from 'react'
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

  const navigate = useNavigate();

  const OpenSurveyPage = () => {
    // Navigate to the new page when the button is clicked
    navigate('/new-page');
  };

  return (
    <div className="button-container bg-dark">
      <button className="btn btn-success m-2" onClick={OpenSurveyPage}>Survey</button>
      <button className="btn btn-success m-2">Analysis</button>
      <div className="leaf-container">
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
      </div>
    </div>
  )
}

export default MainPage
