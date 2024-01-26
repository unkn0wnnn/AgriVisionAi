// src/components/SurveyPage.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyPage = () => {
  const [numberOfRows, setNumberOfRows] = useState('');
  const [buttons, setButtons] = useState([]);
  const [error, setError] = useState('');
  const [submissionInitiated, setSubmissionInitiated] = useState(false); // New state variable
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const navigate = useNavigate(); 

  const handleInputChange = (event) => {
    setNumberOfRows(event.target.value);
    setError('');
  };

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
  
        mediaRecorderRef.current = new MediaRecorder(stream);
        chunksRef.current = [];
  
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };
  
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'video/webm' });
          const formData = new FormData();
          formData.append('video', blob, `recorded_video_${Date.now()}.webm`);
  
          // Send the recorded video to the server
          fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data.message);
            })
            .catch((error) => {
              console.error('Error uploading video:', error);
            });
  
          // Reset the video preview
          videoRef.current.srcObject = null;
        };
  
        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
        setError('Error accessing camera. Please try again.');
      });
  };
  
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedRows = parseInt(numberOfRows, 10);

    if (isNaN(parsedRows) || parsedRows <= 0 || parsedRows > 5) {
      setError('Number of rows must be between 1 and 5');
      setButtons([]);
    } else {
      const buttonsArray = [];
      for (let i = 1; i <= parsedRows; i++) {
        buttonsArray.push(
          <div>
          <div key={i} className="m-2">
            <button className="btn btn-success" onClick={handleStartRecording}>
              Start Recording {i}
            </button>
            <button className="btn btn-danger" onClick={handleStopRecording}>
              Stop Recording {i}
            </button>
          </div>
          
          </div>
        );
      }
      buttonsArray.push(              
      <div className="mt-3">
      <p className="text-warning">
        Since it is a computationally expensive task, video analysis will be done on an offline machine,
        and the results will be uploaded later.
      </p>
      <button
        type="button"
        className="btn btn-info"
        onClick={handleOfflineAnalysisSubmit}
      >
        Continue to Main Page
      </button>
    </div>);
      setButtons(buttonsArray);
      setError('');
    }
  };
  const handleOfflineAnalysisSubmit = () => {
    // Simulate an asynchronous task (e.g., API call or offline processing)
    setTimeout(() => {
      // Redirect to the main page after processing
      navigate('/');
    }, 3000); // Adjust the timeout duration as needed
  };

  return (
    <div className="bg-dark text-light d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
      <div className="leaf-container">
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
        <img className="leaf" src="https://cdn3.iconfinder.com/data/icons/spring-23/32/leaf-spring-plant-ecology-green-512.png" alt="leaf" />
      </div>
        <video ref={videoRef} width="320" height="240" autoPlay muted></video>
        {buttons.length === 0 ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="numberOfRows" className="form-label">
                Number of Rows:
              </label>
              <input
                type="number"
                className="form-control"
                id="numberOfRows"
                value={numberOfRows}
                onChange={handleInputChange}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        ) : (
          <div>
            {buttons}
            {/* Render the message and initiate offline analysis when submission is initiated */}
            {submissionInitiated && (
              <div className="mt-3">
                <p className="text-warning">
                  Since it is a computationally expensive task, video analysis will be done on an offline machine,
                  and the results will be uploaded later.
                </p>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={handleOfflineAnalysisSubmit}
                >
                  Continue to Main Page
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;
