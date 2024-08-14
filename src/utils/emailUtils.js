import emailjs from 'emailjs-com';

export const sendReceiptEmail = (receiptDetails) => {
  const templateParams = {
    orderId: receiptDetails.orderId,
    items: receiptDetails.items.map(item => `${item.caption} - $${item.price} x ${item.quantity}`).join(', '),
    subtotal: receiptDetails.subtotal,
    federalTax: receiptDetails.federalTax,
    quebecTax: receiptDetails.quebecTax,
    total: receiptDetails.total,
    userEmail: receiptDetails.userEmail,
  };

  emailjs.send('service_5afacpg', 'template_c7ahomf', templateParams, 'dSNPltwRo7CXDhHKR')
    .then(response => {
      console.log('Receipt email sent successfully', response.status, response.text);
    })
    .catch(error => {
      console.error('Failed to send receipt email', error);
    });
};
