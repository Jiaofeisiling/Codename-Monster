export const validateTransactionData = (data) => {
  if (!data) return "Transaction data is missing";
  if (!data.shop || typeof data.shop !== 'object') return "Shop data is missing or invalid";
  if (!data.products || !Array.isArray(data.products)) return "Products data is missing or invalid";
  if (!data.transaction_time) return "Transaction time is missing";
  if (!data.user) return "User is missing";

  return null;
};
