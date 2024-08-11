/* eslint-disable*/
import React,{useRef} from "react";
import axios from 'axios'
import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from '../../store/authSlice'
const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const dispatch = useDispatch()

    const navigateToSignup = ()=>{
        history.push('signup')
    }
    const submitHandler = async (event)=>{
        event.preventDefault()
        const email = emailRef.current.value
        const password = passwordRef.current.value
        
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDabA_wsNZpPvzGZB66Zm7_xrjIwAjSfj0',{
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
        passwordRef.current.value = ''
        emailRef.current.value = ''
    }

    return (
        <div className={styles.background}>
            <form className={styles.glass} onSubmit={submitHandler}>
                <h3 className="center">Sign In</h3>

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
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className={`${styles.btn} btn btn-primary`}>Submit</button>
                </div>
                <p className={styles["forgot-password"]}>
                    Forgot <button href="#" className={styles.linkButton}>password?</button>
                </p>
                <p className={styles["create-account"]}>
                    Don't have an account? <button type="button" onClick={navigateToSignup} className={styles.linkButton} >Create an account</button>
                </p>
            </form>
        </div>
    );
}

export default Login;
