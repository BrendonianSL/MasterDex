import SearchContainer from "./Features/Search/SearchContainer";
import { useSelector } from "react-redux";
export default function Home() {

    const pokemonDataStatus = useSelector(state => state.pokemonData.status);
    const pokemonData = useSelector(state => state.pokemonData.pokemon);

    if(pokemonDataStatus === 'pending')
    {
        return <h1>Loading Data</h1>
    } else if (pokemonDataStatus === 'rejected') {
        return <h1>Error Loading Data</h1>
    } else if (pokemonDataStatus === 'fulfilled') {
        return <SearchContainer />
    }
}