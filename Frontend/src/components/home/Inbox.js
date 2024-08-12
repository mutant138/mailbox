import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { emailActions } from '../../store/emailSlice';
import EmailDetailPopup from './EmailDetailPopup';
import styles from './Inbox.module.css';

const Inbox = () => {
    const { user } = useSelector((state) => state.auth);
    const { emails, unreadCount } = useSelector((state) => state.email);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEmailsData = async () => {
            try {
                const response = await axios.get(
                    `https://fir-620df-default-rtdb.firebaseio.com/emails/${user.email.replace('.', '_')}/inbox.json`
                );
                //console.log('Fetched emails:', response.data); // Log fetched data
                const emailsArray = response.data
                    ? Object.keys(response.data).map((key) => ({
                        ...response.data[key],
                        id: key // Use Firebase key as ID
                    }))
                    : [];
                dispatch(emailActions.setEmails(emailsArray));
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        };
    
        fetchEmailsData();
        const intervalId = setInterval(fetchEmailsData, 5000);
        return () => clearInterval(intervalId);
    }, [user.email, dispatch]);
    

    const handleEmailClick = async (email) => {
        setSelectedEmail(email);
    
        if (!email.read) {
            try {
                await axios.patch(
                    `https://fir-620df-default-rtdb.firebaseio.com/emails/${user.email.replace('.', '_')}/inbox/${email.id}.json`,
                    { read: true }
                );
                dispatch(emailActions.markAsRead(email.id));
            } catch (error) {
                console.error('Error updating email status:', error);
            }
        }
    };
    
    const handleClosePopup = () => {
        setSelectedEmail(null);
    };

    return (
        <div className={styles.inboxContainer}>
            <h2>Inbox ({unreadCount} unread)</h2>
            <div className={styles.emailList}>
                {emails.length === 0 ? (
                    <p>No emails found.</p>
                ) : (
                    emails.map((email, index) => (
                        <div
                            key={index}
                            className={`${styles.emailItem} ${email.read ? '' : styles.unread}`}
                            onClick={() => handleEmailClick(email)}
                        >
                            {!email.read && <span className={styles.blueDot}></span>}
                            <div className={styles.emailDetails}>
                                <h4><strong>Subject: </strong>{email.subject}</h4>
                                <p><strong>Message: </strong>{email.content}</p>
                            </div>
                            <small>From: {email.sender}</small>
                        </div>
                    ))
                )}
            </div>
            {selectedEmail && (
                <EmailDetailPopup email={selectedEmail} onClose={handleClosePopup} />
            )}
        </div>
    );
};

export default Inbox;
