import styles from './CallToActionButton.module.css';

export function CallToActionButton({ buttonText, callbackFunction }) {
    return (
        <button onClick={callbackFunction} className={styles.ctaButton}>{buttonText}</button>
    )
}