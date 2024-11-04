import styles from './Card.module.css';
import { useSelector } from 'react-redux';
export function ItemCard({ name, sprite, id}) {

    const isDarkMode = useSelector(state => state.darkMode.darkMode);
    return (
        <div style={{backgroundColor: isDarkMode ? '#333' : '#FFF'}} className={styles.gridItem}>
            <div className={styles.gridItemInfo}>
                <img className={styles.cardSprite} src={sprite} alt={'Sprite Of ' + name} />
                <div className={styles.pokemonDetails}>
                    <span className={styles.pokemonName}>{name.replace('-', ' ').toUpperCase()}</span>
                    <span className={styles.pokemonID}>{`#${id}`}</span>
                </div>
            </div>
            <div style={{backgroundColor: '#EF5350'}} className={styles.cardAccent}></div>
        </div>
    )
}