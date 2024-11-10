import styles from './DropdownButton.module.css';
import { useState } from 'react';
export function DropdownButton() {

    //Controls The Selected State. False By Default Because Buttons Aren't Clicked.
    const [selected, setSelected] = useState(false);

    //Controls The Current Option That We Have Selected
    const [selectedOption, setSelectedOption] = useState('All');

    //Helper Function. Toggles The Selected State.
    function handleClick() {
        //Updates The State On Button Click. Sets It To Opposite.
        setSelected(!selected);
    }

    function handleOptionClick({ target }) {
        //Updates The Current Option That We Have Selected
        setSelectedOption(target.name);
    }

    return (
        <div>
            <button onClick={handleClick} className={styles.dropdownButton}>
                <span>{selectedOption}</span>
                <div className={styles.caret}></div>
            </button>
            <div style={{display: selected ? 'flex' : 'none'}} className={styles.dropdownContent}>
                <button value = "grass" name="Grass" className={styles.option} onClick={handleOptionClick}>Grass</button>
                <button value="fire" className={styles.option} onClick={handleClick}>Fire</button>
                <button value="water" className={styles.option} onClick={handleClick}>Water</button>
                <button value="bug" className={styles.option} onClick={handleClick}>Bug</button>
                <button value="normal" className={styles.option} onClick={handleClick}>Normal</button>
                <button value="poison" className={styles.option} onClick={handleClick}>Poison</button>
                <button value="electric" className={styles.option} onClick={handleClick}>Electric</button>
                <button value="ground" className={styles.option} onClick={handleClick}>Ground</button>
                <button value="fairy" className={styles.option} onClick={handleClick}>Fairy</button>
                <button value="psychic" className={styles.option} onClick={handleClick}>Psychic</button>
                <button value="rock" className={styles.option} onClick={handleClick}>Rock</button>
                <button value="ice" className={styles.option} onClick={handleClick}>Ice</button>
                <button value="ghost" className={styles.option} onClick={handleClick}>Ghost</button>
                <button value="dragon" className={styles.option} onClick={handleClick}>Dragon</button>
                <button value="dark" className={styles.option} onClick={handleClick}>Dark</button>
                <button value="steel" className={styles.option} onClick={handleClick}>Steel</button>
                <button value="fighting" className={styles.option} onClick={handleClick}>Fighting</button>
                <button value="flying" className={styles.option} onClick={handleClick}>Flying</button>
            </div>
        </div>
    )
}