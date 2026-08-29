export function isTotalPriceCorrect(data) {
  // 提取商品列表
  const products = data.products;

  // 计算商品总价
  let calculatedTotalPrice = 0;
  products.forEach(product => {
    let item = product.quantity * product.unit_price;
    calculatedTotalPrice += product.quantity * product.unit_price;
    //console.log(item);
  });
  //console.log(calculatedTotalPrice);

  // 比较计算出的总价和提供的总价
  return Math.abs(calculatedTotalPrice - data.total_price) < 0.01;
}

// 示例 JSON 数据
const shoppingData = {
  "shopping_place": {
    "name": "NEW WORLD",
    "address": "125 QUEEN STREET, AUCKLAND",
    "phone_number": "09 300-5390"
  },
  "products": [
    { "name": "KEWPIE D/ROASTED SESAME DRESSIN", "quantity": 1, "unit_price": 5.59 },
    { "name": "PAMS EGGS BARN SIZE 7 12PK", "quantity": 1, "unit_price": 6.89 },
    { "name": "PURE NZ SPRING WATER 1.5L", "quantity": 1, "unit_price": 1.09 },
    { "name": "S/LORD TUNA IN SPRINGWATER 185G", "quantity": 1, "unit_price": 3.99 },
    { "name": "PF SEALORD TUNA 185G", "quantity": 1, "unit_price": -1.98 },
    { "name": "S/LORD TUNA SENSINS OLIVE OIL 185G", "quantity": 1, "unit_price": 3.99 },
    { "name": "S/LORD TUNA SENSINS TOMATO BASIL 185G", "quantity": 1, "unit_price": 3.99 },
    { "name": "PF SEALORD TUNA 185G", "quantity": 1, "unit_price": -1.98 },
    { "name": "S/LORD TUNA SWEET CHILLI 185G", "quantity": 1, "unit_price": 3.99 },
    { "name": "WATTIES APRICOT HALVES IN NAT JUIC 410G", "quantity": 1, "unit_price": 3.29 },
    { "name": "A/FRESH SMKD KING FISH 200G", "quantity": 1, "unit_price": 11.99 },
    { "name": "MANDARIN", "quantity": 0.535, "unit_price": 4.99 },
    { "name": "SALADS CRISPY DRESSING L/B PP 300G", "quantity": 1, "unit_price": 5.49 },
    { "name": "NZ BEEF PREMIUM MINCE", "quantity": 1, "unit_price": 6.91 }
  ],
  "total_price": 55.92
};

// 调用函数并打印结果
//console.log(isTotalPriceCorrect(shoppingData)); // 返回 true 或 false
// 5.59+6.89+1.09+3.99-1.98+3.99+3.99-1.98+3.99+3.29+11.99+2.67+5.49+6.91
