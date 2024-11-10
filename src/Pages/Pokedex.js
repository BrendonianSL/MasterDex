import styles from './Pokedex.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ErrorComponent } from '../components/ErrorComponent';
import FetchData from '../services/FetchData';
import { applicationData } from '../services/applicationDataSlice';
import { PokemonCard } from '../components/PokemonCard';
import { DropdownButton } from '../components/DropdownButton';
import { SkeletonGrid } from '../components/SkeletonGrid';

export function Pokedex() {
    const dispatch = useDispatch();
    const [paginatedData, setPaginatedData] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [fetchLoad, setFetchLoad] = useState(false);

    //Use State Responsible For Setting Filters.
    const [filters, setFilters] = useState({
        type: '',
    });

    const pokemonData = useSelector(state => state.applicationData.pokemonData);
    const isLoading = useSelector(state => state.applicationData.isLoading);
    const error = useSelector(state => state.applicationData.error);

    //Trigger Pagination Once We Are Done Loading The Pokemon Data OR When Filters Change.
    useEffect(() => {
        if (!isLoading && !error) {
            //Triggers Pagination.
            paginateData();
        }
    }, [isLoading, error, filters]); //Pagination Only Gets Triggered When Loading, Error, Or Filters Change.

    //Fetch Details About Pokemon From The Current Page.
    useEffect(() => {
        if (paginatedData[pageNumber]) {
            //Triggers The Details Search.
            fetchPokemonDetails();
        }
    }, [pageNumber, paginatedData]); //Fetch Details Only Gets Triggered When We Change The Page Number Or Paginated Data Changes.

    //Changes The Page Number Upon Filters Changing.
    useEffect(() => {
        //Directly Resets The Page Number Back To 1.
        setPageNumber(1);
    }, [filters]); //Reset Page Number Only Gets Triggered When Filters Change.

    //Helper Function To Paginate The Data. It's Asynchrnous To Await The Results For The Filters If Needed.
    async function paginateData() {

        //Creates An Empty Object To Store Data.
        const data = {};

        //Check To See If There Is Filters Applied.
        if(filters.type || filters.generation) {
            //If There Are Filters, Filter The Data First.
            const filteredData = await filterSearch();

            //Calculates Total Pages By Dividing The Length Of The Filtered Data By 20.
            const totalPages = Math.ceil(filteredData.length / 20);

            //Begins Assigning Data To Every Page
            for(let page = 1; page <= totalPages; page++) {
                //Calculates The Start And End Index For The Page.
                const start = (page - 1) * 20;
                const end = (page * 20);

                //Assigns The Data To The Current Page.
                data[page] = filteredData.slice(start, end);
            }
            } else {
                //Calculates The Total Number Of Pages.
                const totalPages = Math.ceil(Object.keys(pokemonData).length / 20);

                for (let page = 1; page <= totalPages; page++) {
                    const start = (page - 1) * 20;
                    const end = page * 20;
                    data[page] = Object.keys(pokemonData).slice(start, end);
            }
        }

        //Updates Paginated Data.
        setPaginatedData(data); 
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

    //Helper Function Responsible For Filtering.
    async function filterSearch() {
        try {
            //Creates An Empty Array To Host The Names Of Filtered Pokemon.
            let filteredData = [];
        
            //Checks If There Is A Typing Filter.
            if (filters.type) {
                //Fetch Data.
                const typeData = await FetchData(`https://pokeapi.co/api/v2/type/${filters.type}`);
                
                //Populate Filtered Data With The Names. 
                filteredData = typeData.pokemon.map(element => element.pokemon.name);
            }
        
            //Checks If There Is A Generation Filter.
            if (filters.generation) {
                //Fetch Data.
                const generationData = await FetchData(`https://pokeapi.co/api/v2/generation/${filters.generation}`);

                //Set That Data To An Array Format.
                const generationArray = generationData.pokemon_species.map(element => element.name);

                //Checks If We Have Filtered Data Present.
                if (filteredData.length > 0) {
                    //If We Do, Filter It.
                    filteredData = filteredData.filter(pokemon => generationArray.includes(pokemon));
                } else {
                    //If We Don't, Add It To The Array.
                    filteredData = generationArray;
                }
            }
        
            //Return The Filtered Data.
            return filteredData;

        } catch (error) {
            console.log("Error Filtering Pokemon Data");
        }
    }

    //Helper Function To Apply Type Filter To Pokemon Data.
    function applyTypeFilter({ target }) {
        setFilters(prevFilters => ({
            ...prevFilters,
            type: target.value,
        }));
    }

    //Helper Function To Apply Generation Filter To The Pokemon.
    function applyGenerationFilter({ target }) {
        setFilters(prevFilters => ({
            ...prevFilters,
            generation: target.value,
        }));
    }
    
    // Conditional rendering based on loading and error state
    if (isLoading) {
        return <SkeletonGrid />;
    } 

    if (error) {
        return <ErrorComponent errorNumber={404} />;
    }

    return (
        <main id={styles.pokedexContainer}>
            <h2>Pokedex</h2>
            <div id={styles.filterContainer}>
                <DropdownButton />
            </div>
            <section id={styles.grid}>
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
            </section>
            <div id={styles.paginationContainer}>
                <button className={styles.paginateButton} onClick={previousPage} disabled={pageNumber === 1}>Prev</button>
                {`${pageNumber} of ${Object.keys(paginatedData).length}`}
                <button className={styles.paginateButton} onClick={nextPage} disabled={pageNumber === Object.keys(paginatedData).length}>Next</button>
            </div>
        </main>
    );
}