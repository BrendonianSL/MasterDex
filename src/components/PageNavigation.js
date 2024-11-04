import { useDispatch, useSelector } from "react-redux";
import { updatePokemon } from "../services/pokemonDataSlice";

export function PageNavigation() {

    const dispatch = useDispatch();

    //Grabs The Current State Of The Pokemon Array and Loading Status
    const pokemonData = useSelector(state => state.pokemonData.data.pokemon);
    const pokemonDataStatus = useSelector(state => state.pokemonData.status);

    function handleNextClick() {

        //Check If There Is A Next Page Available.
        //If There Is A Next Page, Dispatch An Action To Fetch Data And Update To Pokemon Data Slice.
        dispatch(updatePokemon(pokemonData.next));
        console.log('PD' + pokemonData.next + ' ' + pokemonData.previous);

    }

    function handlePreviousClick() {
        dispatch(updatePokemon(pokemonData.previous));
        console.log('PD' + pokemonData.next + ' ' + pokemonData.previous);
    }
    return (
        <div>
            <button onClick={handlePreviousClick}>Previous</button>

            <button onClick={handleNextClick}>Next</button>
        </div>
    )
}