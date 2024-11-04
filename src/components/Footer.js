import styles from './Footer.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export function Footer() {

    //Allows For Us To Determine If DarkMode Is Active.
    const isDarkMode = useSelector(state => state.darkMode.darkMode);
    
    return (
        <footer style={{backgroundColor: isDarkMode ? '#FFF' : '#141414'}}>
            <section id={styles.footerNav}>
                <div id={styles.footerLogo}>
                    <svg width="20" height="20" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_34)">
                            <path d="M150 99C177.338 99 199.5 76.8381 199.5 49.5C199.5 22.1619 177.338 0 150 0C122.662 0 100.5 22.1619 100.5 49.5C100.5 76.8381 122.662 99 150 99Z" fill={isDarkMode ? '#141414' : '#FFF'}/>
                            <path d="M201.1 147C201 148.1 201 149.3 201 150.4C201.1 163.4 196.3 175.9 187.1 185.1L185 187.2C175.9 196.3 163.5 201.2 150.6 201.1C150.4 201.1 150.1 201.1 149.9 201.1C149.7 201.1 149.4 201.1 149.2 201.1C136.3 201.3 123.9 196.3 114.8 187.2L112.7 185.1C103.5 175.9 98.7 163.4 98.8 150.4C98.8 149.3 98.8 148.1 98.7 147C97.3 122.6 77.9 102.7 53.5 100.7C22.8 98.1 -2.60001 123.6 -0.10001 154.3C1.89999 178.6 21.9 198 46.2 199.5C47.3 199.6 48.5 199.6 49.6 199.6C62.6 199.5 75.1 204.3 84.3 213.5L86.4 215.6C95.6 224.8 100.4 237.3 100.3 250.3C100.3 252 100.4 253.7 100.5 255.4C102.7 279.3 122.3 298.4 146.3 300.1C175.2 302.1 199.3 279.2 199.3 250.7C199.3 250.5 199.3 250.2 199.3 250C199.1 237.1 204.1 224.7 213.2 215.6L215.3 213.5C224.5 204.3 237 199.5 250 199.6C251.1 199.6 252.2 199.6 253.4 199.5C277.8 198.1 297.7 178.7 299.7 154.3C302.3 123.6 276.8 98.2 246.1 100.7C221.9 102.7 202.5 122.7 201.1 147Z" fill={isDarkMode ? '#141414' : '#FFF'}/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1_34">
                            <rect width="300" height="300" fill="white"/>
                            </clipPath>
                        </defs> 
                    </svg>
                    <h2>MasterDex</h2>
                </div>
                <div id={styles.footerContainer}>
                    <div className={styles.footerFrame}>
                        <h4>About Us</h4>
                        <p>
                            MasterDex is a project created by Brendan Lewis, A 
                            Front End Web Developer & Game Designer.
                        </p>
                    </div>
                    <div className={styles.footerFrame}>
                        <h4>Navigation</h4>
                        <ul className={styles.linkList}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/pokedex">Pokedex</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                    <div className={styles.footerFrame}>
                        <h4>Tools</h4>
                        <ul className={styles.linkList}>
                            <a href="https://pokeapi.co/" target='_blank'><li>PokeAPI</li></a>
                            <a href="https://pokeapi.co/" target='_blank'><li>Type Icons</li></a>
                        </ul>
                    </div>
                    <div className={styles.footerFrame}>
                        <h4>Check Me Out!</h4>
                        <p>
                            View the source file on Github or check me out on LinkedIn!
                        </p>
                        <div id={styles.socialLinks}>
                            <a className={styles.test} href="https://www.linkedin.com/feed/" target='_blank'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                                        <path 
                                            fill={isDarkMode ? '#141414' : '#FFF'}
                                            d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                                        />
                                </svg>
                            </a>
                            <a className={styles.test} href='https://github.com/BrendonianSL/MasterDex'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                                    <path 
                                        fill={isDarkMode ? '#141414' : '#FFF'}
                                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z">
                                    </path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}