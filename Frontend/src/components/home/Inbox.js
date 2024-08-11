import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Inbox.module.css';
import { useSelector } from 'react-redux';
import EmailDetailPopup from './EmailDetailPopup'; // Import the popup component

const Inbox = () => {
    const { user } = useSelector((state) => state.auth);
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [showDetailPopup, setShowDetailPopup] = useState(false);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await axios.get(`https://fir-620df-default-rtdb.firebaseio.com/emails/${user.email.replace('.', '_')}/inbox.json`);
                setEmails(response.data ? Object.values(response.data) : []);
            } catch (error) {
                console.error("Error fetching emails:", error);
            }
        };

        fetchEmails();
    }, [user.email]);

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
        setShowDetailPopup(true);
    };

    const handleClosePopup = () => {
        setShowDetailPopup(false);
    };

    return (
        <div className={styles.inbox}>
            <h2>Inbox</h2>
            {emails.length === 0 ? (
                <p>No emails found.</p>
            ) : (
                emails.map((email, index) => (
                    <div 
                        key={index} 
                        className={styles.email} 
                        onClick={() => handleEmailClick(email)}
                    >
                        <h4>{email.subject}</h4>
                        <p>{email.content}</p>
                        <small>From: {email.sender}</small>
                    </div>
                ))
            )}
            {showDetailPopup && selectedEmail && (
                <EmailDetailPopup 
                    email={selectedEmail} 
                    onClose={handleClosePopup} 
                />
            )}
        </div>
    );
};

export default Inbox;
