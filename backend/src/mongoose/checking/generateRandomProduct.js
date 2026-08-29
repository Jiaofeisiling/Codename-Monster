// 生成随机商品数据的函数
export function generateRandomProduct() {
  const productNames = [
    "KEWPIE D/ROASTED SESAME DRESSIN", "PAMS EGGS BARN SIZE 7 12PK", "PURE NZ SPRING WATER 1.5L",
    "S/LORD TUNA IN SPRINGWATER 185G", "PF SEALORD TUNA 185G", "S/LORD TUNA SENSINS OLIVE OIL 185G",
    "S/LORD TUNA SENSINS TOMATO BASIL 185G", "S/LORD TUNA SWEET CHILLI 185G", "WATTIES APRICOT HALVES IN NAT JUIC 410G",
    "A/FRESH SMKD KING FISH 200G", "MANDARIN", "SALADS CRISPY DRESSING L/B PP 300G", "NZ BEEF PREMIUM MINCE"
  ];

  const randomName = productNames[Math.floor(Math.random() * productNames.length)];
  const randomQuantity = (Math.random() * 3 + 0.1).toFixed(3); // 随机生成0.1到3之间的小数
  const randomPrice = (Math.random() * 10 + 1).toFixed(2); // 随机生成1到10之间的小数

  return {
    name: randomName,
    quantity: parseFloat(randomQuantity),
    unit_price: parseFloat(randomPrice)
  };
}

// 调用函数并输出结果
// console.log(generateRandomProduct());
