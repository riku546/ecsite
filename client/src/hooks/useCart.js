'use client'

import React, { useState } from 'react'
import {
    decreaseProductInCart,
    deleteProductInCart,
    increaseProductInCart,
    getCartContents,
} from '@/lib/cartFunc'

const useCart = () => {
    //セッションとステートの両方のbuyQuantityを１減らす
    const decreaseFunc = (productId, setCartContent) => {
        decreaseProductInCart(productId)

        //以下のコードの実行例
        //prev = {4 : 2 , 3 : 1}  productId = 4
        //setCartContent実行後のstate {4 : 1 , 3 : 1}
        setCartContent(prev => ({
            ...prev,
            [productId]: prev[productId] - 1,
        }))
    }

    //セッションとステートの両方のbuyQuantityを１増やす
    const increaseFunc = (productId, setCartContent) => {
        increaseProductInCart(productId)

        //以下のコードの実行例
        //prev = {4 : 2 , 3 : 1}  productId = 4
        //setCartContent実行後のstate {4 : 3 , 3 : 1}
        setCartContent(prev => ({
            ...prev,
            [productId]: prev[productId] + 1,
        }))
    }

    //セッションとステートの両方から商品を削除
    const deleteFunc = (productId, setCartContent) => {
        deleteProductInCart(productId)

        //以下のコードの実行例
        //prev = {4 : 2 , 3 : 1}  productId = 4
        //setCartContent実行後のstate {3 : 1}
        setCartContent(prev => {
            //新しいオブジェクトを定義して更新関数に返さないとレンダリングされない
            const newCartContents = { ...prev }
            delete newCartContents[productId]
            return newCartContents
        })
    }
    return { decreaseFunc, deleteFunc, increaseFunc }
}

export default useCart
