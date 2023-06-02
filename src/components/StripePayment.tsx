'use client';
import React, { useEffect, useState } from 'react';
import { clientFetcher } from '@/lib/fetchers/clientFetcher';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Skeletons/Spinner';

// Make sure to call `loadStripe` outside a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(process.env.STRIPE_KEY!);

async function startPayment(url: string, { arg }: { arg: null }) {
    return clientFetcher<{ url: string }>({
        url,
        method: 'post',
    });
}

export default function StripePayment() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { trigger } = useSWRMutation(`/appointment-payment/createCheckoutIntent`, startPayment);

    useEffect(() => {
        setLoading(false);
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        // TODO: change this to a toast
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    return (
        <button
            className="text-white bg-primary-700 hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-8 items-center justify-center w-32"
            role="link"
            disabled={loading}
            onClick={async (e) => {
                e.preventDefault();
                setLoading(true);
                const stripePayment = await trigger(null);
                if (stripePayment) {
                    router.push(stripePayment.url);
                }
            }}
        >
            {loading ? <Spinner /> : 'Pagar'}
        </button>
    );
}
