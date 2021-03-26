import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51IYVE0EGTiHa76Z7bcm9R4mTGY5uJPTeF3mbix9imC65JJoDc7EjBCQPXOI79Jregiym7Shqg4TjocRlpjyJwBRU00ivY67KDU"

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}
