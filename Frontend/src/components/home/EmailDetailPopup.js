import React from 'react';
import styles from './EmailDetailPopup.module.css';

const EmailDetailPopup = ({ email, onClose }) => {
    if (!email) return null; // Ensure email is defined

    console.log('Email details:', email); // Log email details

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>{email.subject || 'No Subject'}</h2>
                <p><strong>Message:</strong> {email.content || 'No Content'}</p>
                <p><strong>From:</strong> {email.sender || 'Unknown Sender'}</p>
            </div>
        </div>
    );
};



export default EmailDetailPopup;
