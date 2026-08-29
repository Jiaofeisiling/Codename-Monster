import { generateRandomProduct } from "./generateRandomProduct.js";
import { isTotalPriceCorrect } from "./isTotalPriceCorrect.js";

// 生成随机购物数据的函数
function generateRandomShoppingData() {
  const shoppingPlaceNames = ["NEW WORLD", "WOOLWORTH", "FURUN", "PACK'N'SAVE"];
  const randomName = shoppingPlaceNames[Math.floor(Math.random() * shoppingPlaceNames.length)];
  const randomAddress = `${Math.floor(Math.random() * 999) + 1} QUEEN STREET, AUCKLAND`;
  const randomPhone = `09 ${Math.floor(Math.random() * 9999) + 1000}-${Math.floor(Math.random() * 9999) + 1000}`;

  const products = [];
  const numberOfProducts = Math.floor(Math.random() * 10 + 5); // 随机生成5到15个商品

  let total = 0;

  for (let i = 0; i < numberOfProducts; i++) {
    const product = generateRandomProduct();
    products.push(product);
    total += product.quantity * product.unit_price;
  }

  return {
    shopping_place: {
      name: randomName,
      address: randomAddress,
      phone_number: randomPhone
    },
    products: products,
    total_price: parseFloat(total.toFixed(2)) // 计算总价并保留两位小数
  };
}

// 测试生成的随机数据
const randomShoppingData = generateRandomShoppingData();

// 调用函数并输出结果
console.log(randomShoppingData);
console.log(isTotalPriceCorrect(randomShoppingData)); // 应该返回 true 或 false
