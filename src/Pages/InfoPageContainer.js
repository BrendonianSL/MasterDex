/* Imported Presentational Element. */
import { InfoPagePresentational } from "./InfoPagePresentational";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchSlice } from "../Features/search/searchSlice";

//Imports Components
import { Error } from "../components/Error";
import { PokemonComponent } from "../components/PokemonComponent";
export function InfoPageContainer() {

    //Destructures The Dynamic Route.
    const { searchQuery } = useParams();

    //Sets Commonly Used Function.
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Subscribes To The Several Parts Of The State.
    const searchTerm = useSelector(state => state.search.searchTerm);
    const data = useSelector(state => state.pokemonData.data);
    const dataStatus = useSelector(state => state.pokemonData.status);

    //Creates Function For Determining What Component To Load.
    const checkMatch = (category) => {
        return data?.[category]?.results?.find(element => element.name === searchTerm);
    };

    useEffect(() => {
        //Checks The SearchQuery To Check For Lowercase Spelling.
        if(searchQuery != searchQuery.toLowerCase()){
            navigate(`/${searchQuery.toLowerCase()}`);
        }

        //Execute The Assignment Of The Search Term.
        dispatch(searchSlice.actions.setSearchTerm(searchQuery));
    }, [searchQuery, navigate, dispatch]);

    if(data) {
        //Creates Variables To Determine If A Match Is Found.
        const foundBerry = checkMatch("berries");
        const foundMove = checkMatch("moves");
        const foundMachine = checkMatch("machines");
        const foundPokemon = checkMatch("pokemon");

        if(foundPokemon) {
            console.log('Pokemon Found');
            //Load Pokemon Component. Passes In URL To Ensure Accurate Dispatching.
            return <PokemonComponent url={foundPokemon.url}/>;
        } if(foundBerry) {
            //Load Berry Component.
        } if(foundMove) {
            //Load Move Component.
        } if(foundMachine) {
            //Load Machine Component.
        } else {
            //Load Error Component.
            return <Error />;
        }
    }
}