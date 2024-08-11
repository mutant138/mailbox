/* eslint-disable */
import React ,{useRef} from "react";
import axios from 'axios'
import styles from "./Login.module.css";
import {useHistory} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const SignUp = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef();
    const history = useHistory()
    const dispatch = useDispatch()

    const navigateToSignIn = ()=>{
    history.push('/signin')
    }
    const submitHandler =async (event)=>{
        event.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDabA_wsNZpPvzGZB66Zm7_xrjIwAjSfj0',{
                email: email,
                password: password,
                returnSecureToken: true
            })
            //alert("Account created successfully!");
            const { idToken, email: userEmail } = response.data;
            dispatch(authActions.login({
                token: idToken,
                user: { email: userEmail }
            }));
            history.push('/home')
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Error signing up: " + (error.response?.data?.error?.message || "Unknown error"));
        }
    }
    return (
        <div className={styles.background}>
            <form className={styles.glass} onSubmit={submitHandler}>
                <h3>Sign Up</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        ref={emailRef}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        ref={passwordRef}
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        ref={confirmPasswordRef}
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className={`${styles.btn} btn btn-primary`}>Sign Up</button>
                </div>
                <p className={styles["forgot-password"]}>
                    Already have an account? <button onClick={navigateToSignIn} className={styles.linkButton}>Sign in</button>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
