import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FetchData from '../services/FetchData';
import { executeSearch } from '../Features/search/searchSlice';
import { Error } from './Error';
import styles from './PokemonComponent.module.css'

export function PokemonComponent({ url }) {
    //Variables Set To Be Used Later.
    const dispatch = useDispatch();

    //Subscribes To The Store State.
    const searchStatus = useSelector(state => state.search.status);
    const searchData = useSelector(state => state.search.searchData);

    //Creates A State To Hold The Summary.
    const [pokemonSummary, setPokemonSummary] = useState(null);

    //Creates A State To Hold The Accent Color
    const [accent, setAccent] = useState('gray');

    //Use Effect That Triggers On Mount.
    useEffect(() => {
        async function getData() {

            //Awaits Dispatch's Completion.
            await dispatch(executeSearch(url));
        }

        //Calls Created Function
        getData();

    }, [dispatch, url]);

    //UseEffect Responsible For Fetching Other Related Data From The API.
    useEffect(() => {
        async function getSummary() {
            console.log('We Ran');
            if(searchData?.species?.url) {
                const summary = await fetchSummary(searchData.species.url);
                console.log('Summary: ' + summary);
                setPokemonSummary(summary);
            }
        }

        getSummary();

    }, [searchData]);

    //UseEffect Responsible For Determining The Pages Accent Color.
    useEffect(() => {
        //If This Path Exist
        if(searchData?.types[0]?.type?.name) {

            //Extracts The Name Value To A Variable And Updates The State.
            setAccent(accentColor(searchData.types[0].type.name));
        }
    }, [searchData]);

    //Helper Function. Used To Fetch Pokemon Summary.
    async function fetchSummary(url) {
        //Fetches Data From The URL
        const response = await FetchData(url);

        //Sets The Summary.
        const summary = response.flavor_text_entries[1].flavor_text;

        //Returns The Summary.
        return summary;
    }

    //Helper Function. Used To Determine The Pages Accent Color. Accepts The Pokemon's First Slot Type As Parameter.
    function accentColor(pokemonType) {
        //Switch Statement To Generate A Color Depending On The Switch Statement Type.
        switch(pokemonType) {
            case 'normal':
                return '#A8A77A';
            case 'fire':
                return '#EE8130';
            case 'water':
                return '#6390F0';
            case 'electric':
                return '#F7D02C';
            case 'grass':
                return '#7AC74C';
            case 'ice':
                return '#96D9D6';
            case 'fighting':
                return '#C22E28';
            case 'poison':
                return '#A33EA1';
            case 'ground':
                return '#E2BF65';
            case 'flying':
                return '#E2BF65';
            case 'psychic':
                return '#F95587';
            case 'bug':
                return '#A6B91A';
            case 'rock':
                return '#B6A136';
            case 'ghost':
                return '#735797';
            case 'dragon':
                return '#6F35FC';
            case 'dark':
                return '#705746';
            case 'steel':
                return '#B7B7CE';
            case 'fairy':
                return '#D685AD';
            default:
                return 'gray';
        }
    }

    //Helper Function. Used To Return Proper Stat Abbreviations.
    function statAbbreviation(stat) {
        switch(stat) {
            case 'hp':
                return 'HP';
            case 'attack':
                return 'ATK';
            case 'defense':
                return 'DEF';
            case 'special-attack':
                return 'SATK';
            case 'special-defense':
                return 'SDEF';
            case 'speed':
                return 'SPD';
            default:
                return stat;
        }
    }

    if(searchStatus === 'pending') {
        console.log('Pending Component');
        return (
            <p>Loading...</p>
        )
    } else if(searchStatus === 'resolved' && pokemonSummary && accent) {
        console.log("Resolved");
        return (
            <section>
                <div className={styles.pageHeading}>
                    <h2>{searchData.name.toUpperCase()}</h2>
                    <div id={styles.typeContainer}>
                        {searchData.types.map(type => {
                            return (
                                <div style={{backgroundColor: accentColor(type.type.name)}} className={styles.pokemonType}>{type.type.name.toUpperCase()}</div>
                            )
                        })}
                    </div>
                </div>
                <article id={styles.grid}>
                    <div style={{backgroundColor: accent}} id={styles.sprite}>
                        <h3>SPRITE</h3>
                        <img src={searchData.sprites.other['official-artwork'].front_default} alt={'A picture of ' + searchData.name}></img>
                    </div>
                    <div style={{backgroundColor: accent}} id={styles.summary}>
                        <h3>SUMMARY</h3>
                        <p>{pokemonSummary}</p>
                    </div>
                    <article style={{backgroundColor: accent}} id={styles.stats}>
                        <h3>STATS</h3>
                        <div id={styles.statsContainer}>
                        {searchData.stats.map(element => {
                            return (
                                <div className={styles.stat}>
                                    <h3>{element.base_stat}</h3>
                                    <p>{statAbbreviation(element.stat.name)}</p>
                                </div>
                            )
                        })}
                        </div>
                    </article>
                    <article style={{backgroundColor: accent}} id={styles.moves}>
                        <h3>MOVES</h3>
                        {searchData.moves.map(move => {
                            return (
                                <p>{move.move.name}</p>
                            )
                        })}
                    </article>
                </article>
            </section>
        )
    } else if(searchStatus === "rejected") {
        console.log('Rejected Component');
        return (
            <Error />
        )
    }
}