import styles from './Pokedex.module.css';
import { PokemonCard } from '../components/PokemonCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { PageNavigation } from '../components/PageNavigation';
import { ItemCard } from '../components/ItemCard';
import { DropdownButton } from '../components/DropdownButton';
import { ErrorComponent } from '../components/ErrorComponent';
import FetchData from '../services/FetchData';
import { applicationData } from '../services/applicationDataSlice';

export function Pokedex() {
    // Creates A Variable To Simplify Dispatching
    const dispatch = useDispatch();

    // Creates A Use State That Is Responsible For Paginated Data.
    const [paginatedData, setPaginatedData] = useState({});
    const [pageNumber, setPageNumber] = useState(1);

    // Subscribes To Parts Of The Redux Store For Us To Use.
    const pokemonData = useSelector(state => state.applicationData.pokemonData);
    const isLoading = useSelector(state => state.applicationData.isLoading);
    const error = useSelector(state => state.applicationData.error);

    // Trigger Data Pagination When pokemonData is Available
    useEffect(() => {
        if (Object.keys(pokemonData).length > 0) {
            paginateData();
        }
    }, [pokemonData]);

    // Helper Function To Paginate The Data.
    function paginateData() {
        let data = {};

        const totalPages = Math.ceil(Object.keys(pokemonData).length / 20);

        for (let page = 1; page <= totalPages; page++) {
            const start = (page - 1) * 20;
            const end = page * 20;
            data[page] = Object.keys(pokemonData).slice(start, end);
        }

        setPaginatedData(data);
    }

    //Helper Function. Used To Fetch Pokemon Details When A New Page Is Being Loaded.
    async function fetchPokemonDetails() {
        try {
            //Fetches Pokemon Data Using The Keys To Access The Hashmaps Url Element For Each Pokemon.
            const fetchedDetails = await Promise.all(
                paginatedData[pageNumber].map(element => {
                    return FetchData(pokemonData[element].url);
                })
            );

            //Creates An Empty Update Data Variable To Store Data Into The Store Once Completed.
            const updateData = {};

            //With All The Details In Hand. Check The Hashmap To See If This Data Exist For Each Pokemon
            paginatedData[pageNumber].forEach((element, index) => {
                //The Order Of The Promise All Matches The Order Of the Paginated Data.
                //Therefore, We Use The Index Of The Element In Paginated Data To
                //Grab The Data From The Fetched Details.
                const details = fetchedDetails[index];

                //Grabs The Pokemon Data From The Store
                const pokemon = pokemonData[element];

                //Only Create A New Entry If Needed.
                if(!pokemon.id || !pokemon.types || !pokemon.sprite) {
                    //Create An Entry For The Pokemon In Update Data.
                    updateData[element] = {};

                    //Checks To See If ID Is Currently In The Hashmap
                    if (!pokemonData[element].id) {
                        console.log('ID Not Present, Updating Hashmap');
                        updateData[element].id = details.id;
                    }

                    //Checks To See If Types Is Currently In The Hashmap
                    if(!pokemonData[element].types) {
                        console.log('Types Not Present, Updating Hashmap');
                        updateData[element].types = details.types;
                    }

                    //Checks To See If Sprite Is Currently In The Hashmap
                    if(!pokemonData[element].sprite) {
                        console.log('Sprite Not Present, Updating Hashmap');
                        updateData[element].sprite = details.sprites.front_default;
                    }
                }
            });

            console.log('DISPATCHED UPDATE');
            //Dispatch An Action To Update The Hashmap.
            dispatch(applicationData.actions.updatePokemonData(updateData));


        } catch (error) {
            console.log(error);
        }
    }

    // Conditional rendering based on loading and error state
    if (isLoading) {
        return <div><p>Loading...</p></div>;
    } 

    if (error) {
        return <ErrorComponent errorNumber={404} />;
    }

    // Display data when loaded and present
    if (Object.keys(pokemonData).length > 0 && Object.keys(paginatedData).length > 0) {
        return (
            <main id={styles.pokedexContainer}>
                <h2>Pokedex</h2>
                <button onClick={fetchPokemonDetails}>Click Me.</button>
            </main>
        );
    }

    return null;
}
