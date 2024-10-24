//This Component Is Used For The Header Of the Webapp.
import styles from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../Features/darkmode/darkModeSlice';

export function Navigation() {
    const dispatch = useDispatch();

    const isDarkMode = useSelector(state => state.darkMode.darkMode);
    return (
        <header style={{backgroundColor: isDarkMode ? '#141414' : '#EBEBEB', color: isDarkMode ? '#FFF' : '#000'}}>
            <nav>
                <svg width="20" height="20" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1_34)">
                        <path d="M150 99C177.338 99 199.5 76.8381 199.5 49.5C199.5 22.1619 177.338 0 150 0C122.662 0 100.5 22.1619 100.5 49.5C100.5 76.8381 122.662 99 150 99Z" fill="#FFF"/>
                        <path d="M201.1 147C201 148.1 201 149.3 201 150.4C201.1 163.4 196.3 175.9 187.1 185.1L185 187.2C175.9 196.3 163.5 201.2 150.6 201.1C150.4 201.1 150.1 201.1 149.9 201.1C149.7 201.1 149.4 201.1 149.2 201.1C136.3 201.3 123.9 196.3 114.8 187.2L112.7 185.1C103.5 175.9 98.7 163.4 98.8 150.4C98.8 149.3 98.8 148.1 98.7 147C97.3 122.6 77.9 102.7 53.5 100.7C22.8 98.1 -2.60001 123.6 -0.10001 154.3C1.89999 178.6 21.9 198 46.2 199.5C47.3 199.6 48.5 199.6 49.6 199.6C62.6 199.5 75.1 204.3 84.3 213.5L86.4 215.6C95.6 224.8 100.4 237.3 100.3 250.3C100.3 252 100.4 253.7 100.5 255.4C102.7 279.3 122.3 298.4 146.3 300.1C175.2 302.1 199.3 279.2 199.3 250.7C199.3 250.5 199.3 250.2 199.3 250C199.1 237.1 204.1 224.7 213.2 215.6L215.3 213.5C224.5 204.3 237 199.5 250 199.6C251.1 199.6 252.2 199.6 253.4 199.5C277.8 198.1 297.7 178.7 299.7 154.3C302.3 123.6 276.8 98.2 246.1 100.7C221.9 102.7 202.5 122.7 201.1 147Z" fill="#FFF"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_34">
                        <rect width="300" height="300" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <h2>MasterDex</h2>
                <button onClick={() => dispatch(toggleDarkMode())}>Dark Mode</button>
            </nav>
        </header>
    )
}