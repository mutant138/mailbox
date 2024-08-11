import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './Home.module.css';
import { useSelector } from 'react-redux';
import Inbox from './Inbox';

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const sender = user?.email;
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');

    const handleEditorChange = (state) => {
        setEditorState(state);
    };

    const toggleCompose = () => {
        setIsComposeOpen(!isComposeOpen);
    };

    const sendEmail = async () => {
        const content = editorState.getCurrentContent().getPlainText();
        const emailData = {
            recipient,
            subject,
            content,
            sender: sender,
            timestamp: Date.now(),
        };

        try {
            await axios.post(`https://fir-620df-default-rtdb.firebaseio.com/emails/${sender.replace('.', '_')}/sent.json`, emailData);
            await axios.post(`https://fir-620df-default-rtdb.firebaseio.com/emails/${recipient.replace('.', '_')}/inbox.json`, emailData);
            alert("Email sent successfully!");
            setIsComposeOpen(false);
            setRecipient('');
            setSubject('');
            setEditorState(EditorState.createEmpty());
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email");
        }
    };

    return (
        <div className={styles.home}>
            <button onClick={toggleCompose} className={styles.composeButton}>Compose Email</button>
            {isComposeOpen && (
                <div className={styles.composePopup}>
                    <h2>Compose Email</h2>
                    <div className={styles.formGroup}>
                        <label>To:</label>
                        <input
                            type="email"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Enter recipient's email"
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Subject:</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter subject"
                            className={styles.inputField}
                        />
                    </div>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        wrapperClassName={styles.editorWrapper}
                        editorClassName={styles.editor}
                    />
                    <button onClick={sendEmail} className={styles.sendButton}>Send</button>
                </div>
            )}
            <Inbox />
        </div>
    );
};

export default Home;
