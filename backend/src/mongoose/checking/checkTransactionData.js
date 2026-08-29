// Function to validate the shop object
export function validateShop(shop) {
  if (!shop || typeof shop !== "object") {
    return "Invalid shop data.";
  }

  const requiredFields = ["name", "address", "phone_number", "category"];

  for (const field of requiredFields) {
    if (!shop[field] || typeof shop[field] !== "string") {
      return `Invalid or missing field in shop: ${field}`;
    }
  }

  return null;
}

// Function to validate the products array
export function validateProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    return "Products should be a non-empty array.";
  }

  for (const product of products) {
    if (typeof product !== "object" || !product.name || typeof product.name !== "string" ||
      typeof product.quantity !== "number" || product.quantity <= 0 ||
      typeof product.unit_price !== "number" || product.unit_price < 0) {
      return `Invalid product data: ${JSON.stringify(product)}`;
    }
  }

  return null;
}

// Function to validate total quantity and total price
export function validateTotals(data) {
  const { products, total_quantity, total_price } = data;

  const calculatedTotalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
  const calculatedTotalPrice = products.reduce((sum, product) => sum + product.quantity * product.unit_price, 0);

  if (total_quantity !== calculatedTotalQuantity) {
    return `Total quantity mismatch. Expected ${calculatedTotalQuantity}, got ${total_quantity}.`;
  }

  if (Math.abs(total_price - calculatedTotalPrice) > 0.01) { // Allow small floating-point errors
    return `Total price mismatch. Expected ${calculatedTotalPrice.toFixed(2)}, got ${total_price}.`;
  }

  return null;
}

// Main validation function
export function validateData(data) {
  if (!data || typeof data !== "object") {
    return "Invalid data format.";
  }

  const { shop, products, total_quantity, total_price, currency } = data;

  // Validate shop
  const shopError = validateShop(shop);
  if (shopError) {
    return shopError;
  }

  // Validate products
  const productsError = validateProducts(products);
  if (productsError) {
    return productsError;
  }

  // Validate totals
  const totalsError = validateTotals(data);
  if (totalsError) {
    return totalsError;
  }

  // Validate currency
  if (!currency || typeof currency !== "string") {
    return "Invalid or missing currency.";
  }

  return "Data is valid.";
}
//
// // Example usage
// const data = {
//   shop: {
//     name: "Fresh Harvest Market",
//     address: "123 Main Street, Anytown",
//     phone_number: "555-123-4567",
//     category: "Grocery",
//   },
//   products: [
//     {
//       name: "Apples",
//       quantity: 5,
//       unit_price: 1.0,
//     },
//     {
//       name: "Milk",
//       quantity: 1,
//       unit_price: 3.0,
//     },
//     {
//       name: "Bread",
//       quantity: 1,
//       unit_price: 2.5,
//     },
//   ],
//   total_quantity: 7,
//   total_price: 10.5,
//   currency: "USD",
// };
//
// console.log(validateData(data));
