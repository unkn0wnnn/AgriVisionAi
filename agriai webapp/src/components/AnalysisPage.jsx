import React from 'react'
import analysisImage from './output_plot.png';

const AnalysisPage = () => {
  return (
<div className="button-container bg-dark">
    <div className='cont-a' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p className="text-warning" style={{ marginBottom: '10px' }}>
            This result was made with following sample videos, which I took in my own farm in my village.
        </p>
        <p className="text-warning" style={{ marginBottom: '10px' }} >
        https://drive.google.com/drive/folders/1XxvmRriKpeQjzG81p98PvK4t_eah1OkT?usp=sharing
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
                src={analysisImage}
                alt=''
                style={{ height: '80%', width: '60%', objectFit: 'cover' }}
            />
        <div className="leaf-container">
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
      </div>
        </div>
    </div>
</div>

  )
}

export default AnalysisPage
