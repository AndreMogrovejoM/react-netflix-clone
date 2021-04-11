import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import db from '../../backend/firebase';
import { selectUser } from '../../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import './Plans.css';

export default function Plans() {

    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(async subscription => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                });
            });
        });
    },[user.uid]);

    useEffect(() => {
        db.collection('products')
        .where('active', '==', true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach( async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);
        });

        return () => {
           
        }
    }, []);

    console.log(subscription);
    const loadCheckout = async (priceId) => {
        const docRef = await db.collection('customers')
        .doc(user.uid).collection('checkout_sessions')
        .add({
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });
        docRef.onSnapshot(async(snap) => {
            const {error, sessionId} = snap.data();
            if(error){
                //show an error to your customer and
                //inspect your cloud function logs in the firebase cosole
                alert(`An error ocurred: ${error.message}`);
            }
            if (sessionId) {
                //we have a session, let's redirect to checkout
                //init stripe
                const stripe = await loadStripe("pk_test_51IeUQOHmEde2YEeSaSSjL4JIqITsLA9DxeBIL9XgblZ69DAbk2K7TeUogrBSEKdVhKI1VJcf01ZeZdDQvflIkvRc00ULdeH2LU");
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    return (
    <div className="plans">
        {subscription && <p>Renewal date:{" "}
            {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
        {Object.entries(products).map(([productId, productData]) => {
            // add some logic to check if the user's subscription is active...
            const isCurrentPackage = productData.name
            ?.toLowerCase()
            .includes(subscription?.role);
            return  (
            <div 
            key={productId}
            className={`${
                isCurrentPackage && "plans__plan--disabled"} plans__plan`}>
                <div className="plans__info">
                    <h5>{productData.name}</h5>
                    <h6>{productData.description}</h6>
                </div>
                <button
                onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                    {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                </button>
            </div>
            );
        })}
    </div>
    )
}
