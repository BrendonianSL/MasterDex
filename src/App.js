import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPokemonData } from './services/pokemonDataSlice';
import { InfoPageContainer } from './Pages/InfoPageContainer';
import { Pokedex } from './Pages/Pokedex';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PokeCompare } from './Pages/PokeCompare';
import { fetchApplicationData } from './services/applicationDataSlice';

function App() {
  // Creates Dispatch Variable For Ease Of Use
  const dispatch = useDispatch();

  const loadingAppData = useSelector(state => state.applicationData.isLoading);
  const appDataError = useSelector(state => state.applicationData.error);


  //Hook Triggered On Application Mount. Fetches Pokemon Data.
  useEffect(() => {
    // On Mount, Fetches Pokemon Data.
    dispatch(fetchApplicationData());
  }, [dispatch]);

  // Conditional rendering based on data fetching status
  if (loadingAppData && !appDataError) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (!loadingAppData && appDataError) {
    return <div>Error loading data. Please try again.</div>;
  }

  // When data is loaded, render the app
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:searchQuery" element={<InfoPageContainer />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
