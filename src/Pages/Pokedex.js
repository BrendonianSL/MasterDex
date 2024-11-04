import styles from './Pokedex.module.css';
import { PokemonCard } from '../components/PokemonCard';
import { useSelector } from 'react-redux';
import { PageNavigation } from '../components/PageNavigation';
import { ItemCard } from '../components/ItemCard';
import { DropdownButton } from '../components/DropdownButton';
import { ErrorComponent } from '../components/ErrorComponent';

export function Pokedex() {
    // Subscribes To Parts Of The Redux Store For Us To Use.
    const pokemonData = useSelector(state => state.applicationData.pokemonData);
    const isLoading = useSelector(state => state.applicationData.isLoading);
    const error = useSelector(state => state.applicationData.error);

    //If Loading. Inform The User.
    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    } 

    //If There Was An Error, Inform The User.
    if (error) {
        return (
            /* Returns Error Component. */
            <ErrorComponent errorNumber={404} />
        );
    }

    //If The Data Is Loaded And Present, Display It.
    if (Object.keys(pokemonData).length > 0) {
        return (
            <main id={styles.pokedexContainer}>
                <h2>Pokedex</h2>
            </main>
        );
    }

    // Return null if none of the conditions are met
    return null;
}