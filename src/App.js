import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPokemonData } from './services/pokemonDataSlice';
import { Navigation } from './components/Navigation';
import { InfoPageContainer } from './Pages/InfoPageContainer';
import { Pokedex } from './Pages/Pokedex';

function App() {
  // Creates Dispatch Variable For Ease Of Use
  const dispatch = useDispatch();

  // Grabs The Current State Of The Pokemon Array and Loading Status
  const pokemonData = useSelector(state => state.pokemonData.data);
  const pokemonDataStatus = useSelector(state => state.pokemonData.status);

  useEffect(() => {
    // On Mount, Fetches Pokemon Data
    dispatch(fetchPokemonData());
  }, [dispatch]);

  // Conditional rendering based on data fetching status
  if (pokemonDataStatus === 'loading') {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (pokemonDataStatus === 'failed') {
    return <div>Error loading data. Please try again.</div>;
  }

  // When data is loaded, render the app
  return (
    <Router>
      {/* Header */}
      <Navigation />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/:searchQuery" element={<InfoPageContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
