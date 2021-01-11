import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_OkLsuJ41fvL1WkCLFGf8ORvg00ewC8gsss';

    const onToken = (token) => {
        console.log(token);
        alert('Payment Completed!');
    };
    return (
        <StripeCheckout
            label='Pay Now'
            name='Fortson Clothing Co.'
            billingAddress
            shippingAddress
            image='https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/beacon.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};
export default StripeCheckoutButton;
