import React, { useState } from 'react';
import styles from './Navbar.module.css';

import { getImageUrl } from '../../utils';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <a className={styles.title} href='/'>
                <img src='src\assets\logo.png' alt='brand' />
            </a>
            <div className={styles.menu}>
                <img
                    className={styles.menuBtn}
                    src={
                        menuOpen
                            ? getImageUrl('nav/closeIcon.png')
                            : getImageUrl('nav/menuIcon.png')
                    }
                    alt='menu-button'
                    onClick={() => setMenuOpen(!menuOpen)}
                />
                <ul className={`${styles.menuitems} ${menuOpen ? styles.menuOpen : ''}`}>
                    <li><a href='#aboutus'>About Us</a></li>
                    <li><a href='#contact'>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
