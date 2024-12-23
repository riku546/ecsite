'use client'

import React, { useEffect, useState } from 'react'
import styles from '@/styles/components/ProductCardInCart.module.css'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import useCart from '@/hooks/useCart'
import axios from '@/lib/axios'
import { fetchProductInfo } from '@/lib/fetchProductInfo'

const ChangeBuyQuantity = ({ productId, buyQuantity, setCartContent }) => {
    const { deleteFunc, decreaseFunc, increaseFunc } = useCart()

    return (
        <div style={{ display: 'flex', gap: '7px' }}>
            {buyQuantity == 1 ? (
                <div onClick={() => deleteFunc(productId, setCartContent)}>
                    <DeleteIcon />
                </div>
            ) : (
                <div onClick={() => decreaseFunc(productId, setCartContent)}>
                    <RemoveCircleIcon />
                </div>
            )}
            <p>{buyQuantity}</p>
            <div onClick={() => increaseFunc(productId, setCartContent)}>
                <AddCircleIcon />
            </div>
        </div>
    )
}

export const ProductCardInCart = ({
    productId,
    buyQuantity,
    setCartContent,
}) => {
    const { deleteFunc } = useCart()
    const [productInfo, setProductInfo] = useState({
        name: '',
        price: null,
    })

    const getAndSetProductInfo = async () => {
        setProductInfo(await fetchProductInfo(productId))
    }

    useEffect(() => {
        getAndSetProductInfo()
    }, [])

    return (
        <div className={styles.mainArea}>
            <Link
                href={{
                    pathname: '/productPage',
                    query: { productId: productId },
                }}>
                <img
                    src={`/productImg/${productId}.jpg`}
                    alt=""
                    className={styles.productImg}
                />
            </Link>
            <div className={styles.productInfo}>
                <div className={styles.nameAndPrice}>
                    <p className={styles.productName}>{productInfo.name}</p>
                    <p className={styles.productPrice}>¥ {productInfo.price}</p>
                </div>
                <div className={styles.userOperationArea}>
                    <ChangeBuyQuantity
                        productId={productId}
                        buyQuantity={buyQuantity}
                        setCartContent={setCartContent}
                    />
                    <div
                        className={styles.deleteArea}
                        onClick={() => deleteFunc(productId, setCartContent)}>
                        <DeleteIcon />
                        <p>削除</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
