import { CallToActionButton } from './CallToActionButton';
import styles from './ErrorComponent.module.css';
import { useSelector } from 'react-redux';

export function ErrorComponent({ errorNumber }) {

    //Subscribes To The Dark Mode State So It Can Change State Whenever It Changes.
    const isDarkMode = useSelector(state => state.darkMode.darkMode);

    return (
        <main style={{backgroundColor: isDarkMode ? '#141414' : '#E3E3E3'}} id={styles.errorContainer}>
            <div id={styles.text}>
                <h2 style={{color: isDarkMode ? '#FFF' : '#000'}}>ERROR</h2>
                <span id={styles.errorNumber}>{errorNumber}</span>
                <p style={{color: isDarkMode ? '#FFF' : '#000'}}>There content you are looking for cannot be found!</p>
            </div>
            <CallToActionButton buttonText={'Return Home'} />
        </main>
    )
}