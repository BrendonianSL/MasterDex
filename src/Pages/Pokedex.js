import styles from './Pokedex.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ErrorComponent } from '../components/ErrorComponent';
import FetchData from '../services/FetchData';
import { applicationData } from '../services/applicationDataSlice';
import { PokemonCard } from '../components/PokemonCard';

export function Pokedex() {
    const dispatch = useDispatch();
    const [paginatedData, setPaginatedData] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [fetchLoad, setFetchLoad] = useState(false);

    const pokemonData = useSelector(state => state.applicationData.pokemonData);
    const isLoading = useSelector(state => state.applicationData.isLoading);
    const error = useSelector(state => state.applicationData.error);

    // Trigger Pagination Once We Are Done Loading The Pokemon Data.
    useEffect(() => {
        if (!isLoading && !error) {
            paginateData(); // When loading is done, trigger pagination
        }
    }, [isLoading, error]);

    // Fetch details for the current page when page number changes.
    useEffect(() => {
        if (paginatedData[pageNumber]) {
            fetchPokemonDetails(); // Fetch details only after data is paginated
        }
    }, [pageNumber, paginatedData]);

    // Helper function to paginate data
    function paginateData() {
        const data = {};
        const totalPages = Math.ceil(Object.keys(pokemonData).length / 20);

        for (let page = 1; page <= totalPages; page++) {
            const start = (page - 1) * 20;
            const end = page * 20;
            data[page] = Object.keys(pokemonData).slice(start, end);
        }
        setPaginatedData(data); // Update paginated data for each page
    }

    // Helper function to fetch details for each pokemon on the current page
    async function fetchPokemonDetails() {
        if (!paginatedData[pageNumber]) return;

        setFetchLoad(true); // Indicate data is being fetched

        try {
            // Fetch details for all pokemon on the current page
            const fetchedDetails = await Promise.all(
                paginatedData[pageNumber].map(element => {
                    return pokemonData[element]?.url ? FetchData(pokemonData[element].url) : Promise.resolve(null);
                })
            );

            const updateData = {};
            paginatedData[pageNumber].forEach((element, index) => {
                const details = fetchedDetails[index];
                if (details && (!pokemonData[element]?.id || !pokemonData[element]?.types || !pokemonData[element]?.sprite)) {
                    updateData[element] = {
                        id: details.id,
                        types: details.types,
                        sprite: details.sprites.front_default ? details.sprites.front_default : details.sprites.other['official-artwork'].front_default,
                    };
                }
            });

            // Dispatch the updated data
            dispatch(applicationData.actions.updatePokemonData(updateData));
        } catch (error) {
            console.log("Error fetching Pokémon details:", error);
        } finally {
            setFetchLoad(false); // Set loading state to false
        }
    }

    // Helper function to go to the next page
    function nextPage() {
        setPageNumber(prevPage => prevPage + 1);
    }

    // Helper function to go to the previous page
    function previousPage() {
        setPageNumber(prevPage => Math.max(prevPage - 1, 1));
    }

    // Conditional rendering based on loading and error state
    if (isLoading) {
        return <div><p>Loading...</p></div>;
    } 

    if (error) {
        return <ErrorComponent errorNumber={404} />;
    }

    return (
        <main id={styles.pokedexContainer}>
            <h2>Pokedex</h2>
            <button onClick={previousPage} disabled={pageNumber === 1}>Previous</button>
            <button onClick={nextPage} disabled={pageNumber === Object.keys(paginatedData).length}>Next</button>
            <ul>
                {fetchLoad ? (
                    <p>Loading...</p>
                ) : (
                    paginatedData[pageNumber]?.map(element => (
                        pokemonData[element]?.name && pokemonData[element]?.id && pokemonData[element]?.types && pokemonData[element]?.sprite ? (
                            <PokemonCard
                                cardKey={pokemonData[element].id}
                                name={pokemonData[element].name}
                                id={pokemonData[element].id}
                                types={pokemonData[element].types}
                                sprite={pokemonData[element].sprite}
                            />
                        ) : (
                            <p key={element}>Loading...</p>
                        )
                    ))
                )}
            </ul>
        </main>
    );
}
