'use client'

import Header from '@/components/selfMade/Header'
import ProductCard from '@/components/selfMade/ProductCard'
import styles from '@/styles/pages/topPage.module.css'
import './global.css'
import Link from 'next/link'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

const Home = () => {
    const [productsInfo, setProductsInfo] = useState([{}])

    //カートページの小計を計算するために、商品の価格を取得してセッションに保存
    //セッションに保存するのは小計計算を高速化するため
    const extractPrice = productsInfo => {
        const ProductPrices = {}
        
        productsInfo.forEach(productInfo => {
            ProductPrices[productInfo.id] = productInfo.price
        })

        //セッションは文字列しか格納できないので、オブジェクトをjson形式の文字列に変換
        const jsonProductPrices = JSON.stringify(ProductPrices)
        sessionStorage.setItem('ProductPrices', jsonProductPrices)
    }

    const fetchAllProductsInfo = async () => {
        try {
            const productsInfo = await axios.get('/api/allProductsInfo')
            extractPrice(productsInfo.data)
            setProductsInfo(productsInfo.data)
        } catch (error) {
            window.alert('エラーが発生しました。再読込みしてください')
        }
    }

    useEffect(() => {
        fetchAllProductsInfo()
    }, [])

    return (
        <div className="container">
            <Header />

            <main className={styles.mainArea}>
                {productsInfo.map(productInfo => (
                    <Link
                        key={productInfo.id}
                        href={{
                            pathname: '/productPage',
                            query: { productId: productInfo.id },
                        }}>
                        <ProductCard
                            key={productInfo.id}
                            name={productInfo.name}
                            productId={productInfo.id}
                        />
                    </Link>
                ))}
            </main>
        </div>
    )
}

export default Home
