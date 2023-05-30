'use client';
import React, { useEffect } from 'react';
import { clientFetcher } from '@/lib/fetchers/clientFetcher';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';

// Make sure to call `loadStripe` outside a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(process.env.STRIPE_KEY!);

async function startPayment(url: string, { arg }: { arg: null }) {
    return clientFetcher<{ url: string }>({
        url,
        method: 'post',
    });
}

export default function StrapiPayment() {
    const router = useRouter();
    const { trigger } = useSWRMutation(`/appointment-payment/createCheckoutIntent`, startPayment);
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const url = await trigger(null);
                if (url) {
                    router.push(url.url);
                }
            }}
            method="POST"
        >
            <section>
                <button type="submit" role="link">
                    Checkout
                </button>
            </section>
            <style jsx>
                {`
                    section {
                        background: #ffffff;
                        display: flex;
                        flex-direction: column;
                        width: 400px;
                        height: 112px;
                        border-radius: 6px;
                        justify-content: space-between;
                    }

                    button {
                        height: 36px;
                        background: #556cd6;
                        border-radius: 4px;
                        color: white;
                        border: 0;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                    }

                    button:hover {
                        opacity: 0.8;
                    }
                `}
            </style>
        </form>
    );
}
