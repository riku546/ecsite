'use client'

import LoginLinks from '@/app/LoginLinks'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/components/Header.module.css'
import Hamburger from './Hamburger'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from 'next/link'

const Header = () => {
    useEffect(() => {}, [])

    return (
        <header className={styles.container}>
            <div className={styles.amazonIcon}>
                <Link href={'/'}>
                    <img
                        src="/social.png"
                        alt="https://www.flaticon.com/free-icons/amazon"
                        width="50px"
                        height="50px"
                    />
                </Link>
                <a
                    href="https://www.flaticon.com/free-icons/amazon"
                    title="amazon icons">
                    Amazon icons created by pocike - Flaticon
                </a>
            </div>
            <div className={styles.iconArea}>
                <div className={styles.cart}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link href={'/cart'}>
                            <ShoppingCartIcon className={styles.cartIcon} />
                        </Link>
                    </div>
                </div>
                <Hamburger />
            </div>
        </header>
    )
}

export default Header
