import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPokemonData } from "./API/pokemonDataSlice";
import { searchSlice } from "./Features/Search/searchSlice";
import { executeSearch } from "./Features/Search/searchSlice";

export default function PokemonInfo() {

    //Grabs The Pokemon Name From The URL.
    const { pokemonName } = useParams();

    //Sets Dispatch For Ease Of Use.
    const dispatch = useDispatch();

    //Grabs Data From The Store.
    const pokemonData = useSelector(state => state.pokemonData.pokemon);
    //Grabs Status Of Data From The Store.
    const pokemonDataStatus = useSelector(state => state.pokemonData.status);
    //Grabs Data From The Store
    const searchData = useSelector(state => state.search.searchData);
    const searchStatus = useSelector(state => state.search.status);
    const searchTerm = useSelector(state => state.search.searchTerm);

    //On Mount, Fetch Pokemon Data
    useEffect(() => {
        //Sets The Current Search Term Because A Search Was Executed.
        dispatch(searchSlice.actions.setSearchTerm(pokemonName));

        //Executes A Search For The Pokemon Based On What We Have Set As The Search Term.
        dispatch(executeSearch(pokemonName));
    }, [dispatch, pokemonName]);

    if(searchStatus === "pending")
    {
        return <h1>Loading Data From PokeAPI</h1>
    } else if (searchStatus === "fulfilled") {
        console.log('Search Term ' + searchTerm);
        console.log('Search Data ' + JSON.stringify(searchData));
        return (
            <>
                <h1>Data Search Completed</h1>
                <p>{searchData.name}</p>
                <p>{searchData.height}</p>
            </>
        
    )
    } else if (searchStatus === "rejected") {
        console.log('Search Term ' + searchTerm);
        console.log('Search Data ' + searchData);
        return <h1>Error Loading Pokemon Data</h1>
    }
}