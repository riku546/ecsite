'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/styles/pages/cart.module.css'
import Header from '@/components/selfMade/Header'
import { ProductCardInCart } from '@/components/selfMade/ProductCardInCart'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { calcTotalPriceInCart, getCartContents } from '@/lib/cartFunc'

const page = () => {
    const [cartContent, setCartContent] = useState(getCartContents())
    const [totalPrice, setTotalPrice] = useState(0)

    //カートの中身が更新され度に小計を計算し直す
    useEffect(() => {
        setTotalPrice(calcTotalPriceInCart(cartContent))
    }, [cartContent])

    return (
        <div className="container">
            <Header />

            <main className={styles.mainArea}>
                <h2 style={{ fontSize: '27px' }}>ショッピングカート</h2>
                <div className={styles.cartArea}>
                    <section className={styles.productList}>
                        {cartContent &&
                            Object.entries(cartContent).map(
                                ([productId, buyQuantity]) => {
                                    return (
                                        <ProductCardInCart
                                            productId={productId}
                                            key={productId}
                                            buyQuantity={buyQuantity}
                                            setCartContent={setCartContent}
                                        />
                                    )
                                },
                            )}
                    </section>

                    {/* 小計とレジに進むボタンのカード */}
                    <Card className={styles.cardStyle} variant="outlined">
                        <CardContent>
                            <p className={styles.totalPrice}>
                                小計 <br /> ¥{totalPrice}
                            </p>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained">レジに進む</Button>
                        </CardActions>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default page
