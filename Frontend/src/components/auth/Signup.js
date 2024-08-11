/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./Login.module.css";

const SignUp = () => {
    return (
        <div className={styles.background}>
            <form className={styles.glass}>
                <h3>Sign Up</h3>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className={`${styles.btn} btn btn-primary`}>Sign Up</button>
                </div>
                <p className={styles["forgot-password"]}>
                    Already have an account? <a href="#">Sign in</a>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
