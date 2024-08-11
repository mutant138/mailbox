// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useSelector , useDispatch} from 'react-redux';
import { authActions } from '../../store/authSlice';

const Navbar = () => {
    const {isAuthenticated, user}= useSelector((state)=> state.auth)
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
    };
    return (
        <nav className={styles.navbar}>
            <Link className={styles['navbar-brand']} to="/home">Mail Box</Link>
            <ul className={styles['navbar-nav']}>
                {isAuthenticated ? (
                    <li className={styles['nav-item']}>
                        <button onClick={logoutHandler} className={styles['nav-link']}>
                            Logout
                        </button>
                        <span>Logged in as : {user?.email}</span>
                    </li>
                ) : (
                    <>
                        <li className={styles['nav-item']}>
                            <Link className={styles['nav-link']} to="/signup">Sign Up</Link>
                        </li>
                        <li className={styles['nav-item']}>
                            <Link className={styles['nav-link']} to="/signin">Sign In</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
