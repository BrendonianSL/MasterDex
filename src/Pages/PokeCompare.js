import { useSelector } from 'react-redux';
export function PokeCompare() {
    //Subscribes To The State
    const pokemonData = useSelector(state => state.applicationData.pokemonData);
    return (
        <h1>PokeCompare</h1>
    )
}