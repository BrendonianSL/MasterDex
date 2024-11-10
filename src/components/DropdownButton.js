import styles from './DropdownButton.module.css';
import { useState } from 'react';
export function DropdownButton({ filterFunction }) {

    //Controls The Selected State. False By Default Because Buttons Aren't Clicked.
    const [selected, setSelected] = useState(false);

    //Controls The Current Option That We Have Selected.
    const [selectedOption, setSelectedOption] = useState('All Types');

    //Controls The Highlighted State.
    const [isHighlighted, setIsHighlighted] = useState(false);

    //Helper Function. Toggles The Selected State.
    function handleClick() {
        //Updates The State On Button Click. Sets It To Opposite.
        setSelected(!selected);
    }

    function handleOptionClick({ target }) {
        //Updates The Current Option That We Have Selected
        setSelectedOption(target.name);

        //Triggers The Search For The Selected Option
        filterFunction(target.value);

        //If The Option Isn't The Default Option, The Button Will Be Highlighted.
        if (target.name !== 'All Types') {
            setIsHighlighted(true);
        } else {
            setIsHighlighted(false);
        }

        //Disbales The Dropdown Menu
        setSelected(false);
    }

    return (
        <div>
            <button style={{backgroundColor: isHighlighted ? '#F05A57' : '#FFF', color: isHighlighted ? '#FFF' : '#141414'}} onClick={handleClick} className={styles.dropdownButton}>
                <span>{selectedOption}</span>
                <div className={styles.caret}></div>
            </button>
            <div style={{display: selected ? 'flex' : 'none'}} className={styles.dropdownContent}>
                <button value="" name="All Types" className={styles.option} onClick={handleOptionClick}>All Types</button>
                <button value = "grass" name="Grass" className={styles.option} onClick={handleOptionClick}>Grass</button>
                <button value="fire" name="Fire" className={styles.option} onClick={handleOptionClick}>Fire</button>
                <button value="water" name="Water" className={styles.option} onClick={handleOptionClick}>Water</button>
                <button value="bug" name="Bug" className={styles.option} onClick={handleOptionClick}>Bug</button>
                <button value="normal" name="Normal" className={styles.option} onClick={handleOptionClick}>Normal</button>
                <button value="poison"  name="Poison" className={styles.option} onClick={handleOptionClick}>Poison</button>
                <button value="electric" name="Electric" className={styles.option} onClick={handleOptionClick}>Electric</button>
                <button value="ground" name="Ground" className={styles.option} onClick={handleOptionClick}>Ground</button>
                <button value="fairy" name="Fairy" className={styles.option} onClick={handleOptionClick}>Fairy</button>
                <button value="psychic" name="Psychic" className={styles.option} onClick={handleOptionClick}>Psychic</button>
                <button value="rock"  name="Rock" className={styles.option} onClick={handleOptionClick}>Rock</button>
                <button value="ice" name="Ice" className={styles.option} onClick={handleOptionClick}>Ice</button>
                <button value="ghost" name="Ghost" className={styles.option} onClick={handleOptionClick}>Ghost</button>
                <button value="dragon" name="Dragon" className={styles.option} onClick={handleOptionClick}>Dragon</button>
                <button value="dark" name="Dark" className={styles.option} onClick={handleOptionClick}>Dark</button>
                <button value="steel" name="Steel" className={styles.option} onClick={handleOptionClick}>Steel</button>
                <button value="fighting" name="Fighting" className={styles.option} onClick={handleOptionClick}>Fighting</button>
                <button value="flying" name="Flying" className={styles.option} onClick={handleOptionClick}>Flying</button>
            </div>
        </div>
    )
}