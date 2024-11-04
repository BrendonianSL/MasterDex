import styles from './DropdownButton.module.css';
import { useState } from 'react';
export function DropdownButton() {

    //Controls The Selected State. False By Default Because Buttons Aren't Clicked.
    const [selected, setSelected] = useState(false);

    //Helper Function. Toggles The Selected State.
    function handleClick() {
        //Updates The State On Button Click. Sets It To Opposite.
        setSelected(!selected);
    }

    return (
        <div className={styles.dropdownButton}>
            <div className={styles.select} onClick={handleClick}>
                <span className={styles.selected}>Type</span>
                <div className={styles.caret}></div>
            </div>
            <ul className={selected ? styles.menuOpen : styles.dropDownMenu}>
                <li>None</li>
                <li>Water</li>
                <li>Grass</li>
                <li>Fire</li>
            </ul>
        </div>
    )
}