/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./Login.module.css";

const Login = () => {
    return (
        <div className={styles.background}>
            <form className={styles.glass}>
                <h3 className="center">Sign In</h3>

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
                    Forgot <a href="#">password?</a>
                </p>
                <p className={styles["create-account"]}>
                    Don't have an account? <a href="#">Create an account</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
