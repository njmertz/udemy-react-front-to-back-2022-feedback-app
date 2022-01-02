import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {FeedbackProvider} from './context/FeedbackContext';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import FeedbackForm from './components/FeedbackForm';
import FeedbackStats from './components/FeedbackStats';
import FeedbackList from './components/FeedbackList';
import AboutIconLink from './components/AboutIconLink';

function App(){

  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            } />
            <Route path='/about' element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;