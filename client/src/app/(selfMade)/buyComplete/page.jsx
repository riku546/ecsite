'use client'

import axios from '@/lib/axios'
import React, { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { resetCartContents } from '@/lib/cartFunc'

const page = () => {
    const fetchCheckoutStatus = async sessionId => {
        try {
            const response = await axios.post(
                '/api/getCheckoutStatus',
                JSON.stringify({ session_id: sessionId }),
            )

            return response.data.status
        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const sessionId = urlParams.get('session_id')

        //決済が成功していれば "complete"
        //失敗した場合 "open"
        const checkoutStatusText = fetchCheckoutStatus(sessionId)

        //決済が失敗した場合は決済ページにリダイレクト
        if (checkoutStatusText === 'open') {
            alert('決済に失敗しました')
            redirect('/checkout')
        }

        //決済が成功した場合はカートをリセット
        resetCartContents()
    }, [])

    return (
        <section id="success">
            <p>success</p>
            <Link href={'/'}>ホームに戻る</Link>
        </section>
    )
}

export default page
