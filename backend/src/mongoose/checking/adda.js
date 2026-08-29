import {dbConnectAndProcessTransaction} from '../addTransaction.js';

const transactionData3 =
  {
    shop: {
      name: 'NEW WORLD',
      address: '125 QUEEN STREET, AUCKLAND',
      phone_number: '09 300-5390',
      category: 'Grocery Store'
    },
    products: [
      {
        name: 'KEWPIE D/ROASTED SESAME DRESSIN',
        quantity: 1,
        unit_price: 5.59
      },
      {
        name: 'PAMS EGGS BARN SIZE 7 12PK',
        quantity: 1,
        unit_price: 6.89
      },
      {
        name: 'PURE NZ SPRING WATER 1.5L',
        quantity: 1,
        unit_price: 1.09
      },
      {
        name: 'S/LORD TUNA IN SPRINGWATER 185G',
        quantity: 1,
        unit_price: 3.95
      },
      { name: 'PF SEALORD TUNA 185G', quantity: 1, unit_price: -1.98 },
      {
        name: 'S/LORD TUNA SENSINS OLIVE OIL 185G',
        quantity: 1,
        unit_price: 3.99
      },
      {
        name: 'S/LORD TUNA SENSINS TOMATO BASIL 185G',
        quantity: 1,
        unit_price: 3.99
      },
      { name: 'PF SEALORD TUNA 185G', quantity: 1, unit_price: -1.98 },
      {
        name: 'S/LORD TUNA SWEET CHILLI 185G',
        quantity: 1,
        unit_price: 3.99
      },
      {
        name: 'WATTIES APRICOT HALVES IN NAT JUIC 410G',
        quantity: 1,
        unit_price: 3.29
      },
      {
        name: 'A/FRESH SMKD KING FISH 200G',
        quantity: 1,
        unit_price: 11.99
      },
      { name: 'MANDARIN', quantity: 1, unit_price: 2.67 },
      { name: 'SALADS CRISPY', quantity: 1, unit_price: 5.49 },
      { name: 'NZ BEEF PREMIUM MINCE', quantity: 1, unit_price: 6.91 }
    ],
    total_quantity: 14,
    total_price: 55.92,
    currency: 'NZD',
    user: '00000003b90998cc99fa0ef8',
    image_path: 'new_world.jpg'
  }

;

dbConnectAndProcessTransaction(transactionData3)
  .then(savedTransaction => {
    console.log("Transaction successfully processed:", savedTransaction);
  })
  .catch(err => {
    console.error("Error during transaction processing:", err);
  });

