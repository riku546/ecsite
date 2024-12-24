'use client'

import { loadStripe } from '@stripe/stripe-js'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import axios from '@/lib/axios'
import { prepareProductInfo } from '@/lib/stripeFunc'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    const fetchClientSecret = async () => {
        const response = await axios.post('/api/payment', {
            cart_items: prepareProductInfo(),
        })
        return response.data.client_secret
    }

    const checkLogined = async () => {
        const response = await axios.get('/api/checkLogined')
        const isLogined = response.data.isLogined
        console.log(isLogined)
        if (!isLogined) router.push('/login')
    }

    checkLogined()

    const options = { fetchClientSecret }

    return (
        <div id="checkout">
            4242424242424242
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    )
}

export default page
