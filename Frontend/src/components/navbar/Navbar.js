// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link className={styles['navbar-brand']} to="/">MyApp</Link>
            <ul className={styles['navbar-nav']}>
                <li className={styles['nav-item']}>
                    <Link className={styles['nav-link']} to="/signup">Sign Up</Link>
                </li>
                <li className={styles['nav-item']}>
                    <Link className={styles['nav-link']} to="/signin">Sign In</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
