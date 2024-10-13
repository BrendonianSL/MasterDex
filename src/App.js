import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPokemonData } from './API/pokemonDataSlice';
//Pages Import
import Home from './Pages/Home';
import PokemonInfo from './PokemonInfo';

function App() {
  //Creates Dispatch Variable For Ease Of Use
  const dispatch = useDispatch();

  //Grabs The Current State Of The Pokemon Array
  const pokemonData = useSelector(state => state.pokemonData.pokemon);

  //On Mount, Fetches Pokemon Data
  useEffect(() => {
    //If The Current Array Has No Data.
    if(pokemonData.length === 0) {
      //Dispatch An Action To Fetch Data In The Store
      dispatch(fetchPokemonData());
    }
  }, [dispatch, pokemonData]); //Dispatch Is Included Because When We Re-Render, We Don't Want To Refer To The Previous Rendering Of The Dispatch Function.

  return (
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:pokemonName" element={<PokemonInfo />}/>
          </Routes>
      </Router>
  );
}

export default App;
