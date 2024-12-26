import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileNavigation from './components/MobileNavigation';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieoSlice';

function App() {
  const dispatch = useDispatch();

  // Fetch movies and shows from your PHP API
  const fetchMediaData = async () => {
    try {
      const response = await axios.get('/movies.php');
      const { movies, shows } = response.data;

      // Dispatch movies and shows to Redux store
      dispatch(setBannerData([...movies, ...shows]));
    } catch (error) {
      console.error('Error fetching media data:', error);
    }
  };

  // Fetch configuration (if needed)
  const fetchConfiguration = async () => {
    try {
      const response = await axios.get('/configuration'); // Adjust if required
      dispatch(setImageURL(response.data.images.secure_base_url + 'original'));
    } catch (error) {
      console.error('Error fetching configuration:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchMediaData();
    fetchConfiguration();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
}

export default App;
