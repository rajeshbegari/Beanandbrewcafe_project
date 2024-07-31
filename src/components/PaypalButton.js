import React, { useEffect } from 'react';

const PayPalButton = ({ amount }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=ASSSqYxFuDop_vK-WC3AX9MXpl-649zUjxZqDOeG5lJ0ZzQOJ4ZkKOAmIUm9M-A5PgyUtGmV5fGQRiJ9';
    script.addEventListener('load', () => {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
              },
            }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
      }).render(`#paypal-button-container-${amount}`);
    });
    document.body.appendChild(script);
  }, [amount]);

  return <div id={`paypal-button-container-${amount}`} />;
};

export default PayPalButton;
