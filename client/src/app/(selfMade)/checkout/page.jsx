'use client'

import { loadStripe } from '@stripe/stripe-js'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import axios from '@/lib/axios'

const page = () => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    const fetchClientSecret = async () => {
        const response = await axios.post('/api/payment', {
            cart_items: [
                {
                    quantity: 1,
                    productId: 2,
                },
            ],
        })
        console.log(response.data)
        return response.data.client_secret
    }

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
