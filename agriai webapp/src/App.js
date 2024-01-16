import './App.css';
import MainPage from './components/MainPage';
import SurveyPage from './components/SurveyPage';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/new-page" element={<SurveyPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
