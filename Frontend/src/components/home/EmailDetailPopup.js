import React from 'react';
import styles from './EmailDetailPopup.module.css';

const EmailDetailPopup = ({ email, onClose }) => {
    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>{email.subject}</h2>
                <p><strong>Message:</strong> {email.content}</p>
                <p><strong>From:</strong> {email.sender}</p>
            </div>
        </div>
    );
};

export default EmailDetailPopup;
