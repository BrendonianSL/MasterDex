import styles from './Pokedex.module.css';
import { useEffect, useState } from 'react';
import { PokemonCard } from '../components/PokemonCard';
import { useSelector } from 'react-redux';
import FetchData from '../services/FetchData';

export function Pokedex() {

    //Creates A Use State For The Current Query Search Set By The User.
    const [query, setQuery] = useState('');

    //Sets The Data For Cards We Have On Screen.
    const [cardData, setCardData] = useState([]);

    //Sets The State For Loading Card Data
    const [loading, setLoading] = useState(false);

    //Subscribes The The Pokemon Data State So We Can Access Values From It.
    const pokemonData = useSelector(state => state.pokemonData.data.pokemon);
    
    function queryChange({ target }) {
        //Sets The Current State Of The Query
        setQuery(target.value);
    }

    //Helper Function. Triggers On Load And When Pokemon Data Changes.
    useEffect(() => {
        //If PokemonData Is Truthy...
        if(pokemonData) {
            async function fetchPokemonDetails() {

                //Starts Loading...
                setLoading(true);
    
                //For Each URL In The PokemoN Data Array, Grab Specific Details
                const response = await Promise.all(pokemonData.results.map(async pokemon => {
                    //Waits For The Response.
                    const response = await FetchData(pokemon.url);
    
                    //Once The Response Is Received, Return The Specific Parts We Need.
                    return {
                        //Returns Name Sprite & Type Of Pokemon.
                        name: pokemon.name,
                        sprite: response.sprites.front_default,
                        types: response.types.map(type => type.type.name),
                        id: response.id,
                    }
                }));
    
                //Sets The Card Data To The Response. The Response Was Mapped, Therefore, It Is An Array.
                setCardData(response);

                console.log('Card Data ' +JSON.stringify(response));
            }

                //Calls Above Function.
                fetchPokemonDetails();
        }
    }, [pokemonData]);

    return (
        <main>
            <h2>POKEDEX</h2>
            <div id={styles.container}>
                <input id={styles.searchBar} type='text' placeholder='Search Pokemon...'></input>
                <div id={styles.content}>
                    <div id={styles.filters}>
                        <h4>FILTERS</h4>
                        <div id={styles.filterButtonsContainer}>
                            <button className={styles.filterButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path fill="#777777" d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2c-4.08 0-7.45 3.05-7.94 7h4.07c.44-1.73 2.01-3 3.87-3s3.43 1.27 3.87 3h4.07c-.49-3.95-3.86-7-7.94-7m0 16c4.08 0 7.45-3.05 7.94-7h-4.07c-.44 1.73-2.01 3-3.87 3s-3.43-1.27-3.87-3H4.06c.49 3.95 3.86 7 7.94 7m0-10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"/></svg>
                                Type
                            </button>
                            <button className={styles.filterButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"><path fill="#777777" d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2c-4.08 0-7.45 3.05-7.94 7h4.07c.44-1.73 2.01-3 3.87-3s3.43 1.27 3.87 3h4.07c-.49-3.95-3.86-7-7.94-7m0 16c4.08 0 7.45-3.05 7.94-7h-4.07c-.44 1.73-2.01 3-3.87 3s-3.43-1.27-3.87-3H4.06c.49 3.95 3.86 7 7.94 7m0-10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"/></svg>
                                Generation
                            </button>
                        </div>
                    </div>
                    <div id={styles.pokemonGrid}>
                        {cardData.map(data => {
                            return (
                                <PokemonCard cardKey={data.id} name={data.name} sprite={data.sprite} types={data.types} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}