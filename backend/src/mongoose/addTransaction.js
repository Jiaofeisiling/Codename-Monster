import {productModel, shopModel, transactionModel} from '../schemas/home.schema.js'; // 假设 Product 模型存在 // 假设 Shop 模型存在 // 假设 Transaction 模型存在
import {dbConnect} from './index.js'; // 引入数据库连接函数

// 添加 Shop 数据并返回 Shop ID
const addShop = async (shopData) => {
  try {
    if (!shopData || typeof shopData !== 'object') {
      throw new Error("Invalid shop data");
    }

    // 检查 Shop 集合中是否已有该商店的信息
    const existingShop = await shopModel.findOne({ name: shopData.name, address: shopData.address });
    if (existingShop) {
      return existingShop._id;  // 返回已有的 Shop ID
    }

    // 如果没有，再插入商店信息
    const shop = new shopModel(shopData);
    const savedShop = await shop.save();
    return savedShop._id;  // 返回保存的 Shop ID
  } catch (err) {
    console.error("Error saving shop:", err);
    throw err;
  }
};

// 添加多个 Product 数据并返回 Product IDs
const addProducts = async (shopId, productsData) => {
  try {
    if (!Array.isArray(productsData) || productsData.length === 0) {
      throw new Error("Products data must be a non-empty array");
    }
    const products = await Promise.all(productsData.map(async (productData) => {
      if (!productData || typeof productData !== 'object') {
        throw new Error("Invalid product data");
      }

      // 检查 products 集合中是否已有该产品的信息
      const existingProduct = await productModel.findOne({ name: productData.name, shop: shopId });
      if (existingProduct) {
        return existingProduct._id;  // 返回已有的 Product ID
      }

      const product = new productModel({...productData, shop: shopId});
      const savedProduct = await product.save();
      return savedProduct._id;  // 返回保存的 Product ID
    }));
    return products;
  } catch (err) {
    console.error("Error saving products:", err);
    throw err;
  }
};

// 添加 Transaction 数据
const addTransaction = async (transactionData) => {
  try {
    if (!transactionData || typeof transactionData !== 'object') {
      throw new Error("Invalid transaction data");
    }

    const { shop, products, transaction_time, currency, total_quantity, total_price, user, image_path, note } = transactionData;

    if (!shop || !products || !Array.isArray(products)) {
      throw new Error("Transaction data must include shop and products");
    }

    // 1. 添加 Shop
    const shopId = await addShop(shop);

    // 2. 添加 Products
    const productIds = await addProducts(shopId, products);

    // 3. 创建 Transaction 数据
    const transaction = new transactionModel({
      shop: shopId,
      products: productIds,
      transaction_time,
      currency,
      total_quantity,
      total_price,
      user, // 需要确保从请求中传入用户 ID
      image_path, // 需要确保传入正确的图片路径
      note: note || "" // 如果没有提供，则设置为空字符串
    });

    const savedTransaction = await transaction.save();
    return savedTransaction;  // 返回保存的 Transaction 文档
  } catch (err) {
    console.error("Error saving transaction:", err);
    throw err;
  }
};


// 数据库连接并处理事务
const dbConnectAndProcessTransaction = async (transactionData) => {
  try {
    await dbConnect();
    const savedTransaction = await addTransaction(transactionData);
    console.log("Transaction successfully saved:", savedTransaction);
    return savedTransaction;
  } catch (err) {
    console.error("Error processing transaction:", err);
    throw err;
  }
};

export { dbConnectAndProcessTransaction };

// // 示例调用
// const transactionData = {
//   shop: {
//     name: "WOOLWORTH",
//     address: "271 QUEEN STREET, AUCKLAND",
//     phone_number: "09 1403-5913",
//     category: "Grocery"
//   },
//   products: [
//     {name: "NZ BEEF PREMIUM MINCE", quantity: 1, unit_price: 6.91},
//     {name: "S/LORD TUNA SENSINS TOMATO BASIL 185G", quantity: 1, unit_price: 3.99},
//     {name: "Mandarin", quantity: 0.535, unit_price: 4.99}
//   ],
//   total_quantity: 3,
//   total_price: 13.57,
//   currency: "NZD",
//   transaction_time: "2021-09-01T12:00:00Z",
//   user: "000000035d6e6f40207d480f",
//   image_path: "data/receipts/image-1737811657854-30857603.jpg",
//   note: ""
// };
// const transactionData1 = {
//   shop: {
//     name: "Gadget Store",
//     address: "101 Tech Park Road",
//     phone_number: "09 2345-6789",
//     category: "Electronics",
//   },
//   products: [
//     {name: "WIRELESS MOUSE", quantity: 1, unit_price: 20.99},
//     {name: "KEYBOARD", quantity: 1, unit_price: 45.50},
//   ],
//   total_quantity: 2,
//   total_price: 66.49,
//   currency: "NZD",
//   transaction_time: "2025-01-04T12:00:00Z",
//   user: "000000035d6e6f40207d480f",
//   image_path: "data/receipts/image-2137811645854-30457605.jpg",
// };
// const transactionData2 = {
//   shop: {
//     name: "Cinema Corner",
//     address: "45 Movie Lane",
//     phone_number: "09 3210-5432",
//     category: "Entertainment"
//   },
//   products: [
//     {name: "MOVIE TICKET", quantity: 2, unit_price: 12.0},
//     {name: "POP CORN", quantity: 1, unit_price: 5.5},
//   ],
//   total_quantity: 2,
//   total_price: 29.5,
//   currency: "NZD",
//   transaction_time: "2025-01-09T12:00:00Z",
//   user: "000000035d6e6f40207d480f",
//   image_path: "data/receipts/image-3637641645414-70476735.jpg",
// };
// const transactionData3= {
//   shop: {
//     name: "Fashion Hub",
//     address: "12 Stylish Street",
//     phone_number: "09 6789-2345",
//     category: "Fashion",
//   },
//   products: [
//     {name: "T-SHIRT", quantity: 2, unit_price: 12.99},
//     {name: "JEANS", quantity: 1, unit_price: 45.5},
//     {name: "SHOES", quantity: 1, unit_price: 25.5}
//   ],
//   total_quantity: 3,
//   total_price: 96.98,
//   currency: "NZD",
//   transaction_time: "2025-01-05T12:00:00Z",
//   user: "000000035d6e6f40207d480f"
// };
// const transactionData4 = {
//   shop: {
//     name: "Books & More",
//     address: "303 Literary Lane",
//     phone_number: "09 1122-3344",
//     category: "Books",
//   },
//   products: [
//     {name: "NOVEL", quantity: 1, unit_price: 19.99},
//     {name: "POETRY COLLECTION", quantity: 2, unit_price: 8.5},
//   ],
//   total_quantity: 2,
//   total_price: 36.99,
//   currency: "NZD",
//   transaction_time: "2025-01-09T12:00:00Z",
//   user: "000000035d6e6f40207d480f"
// };
//
// dbConnectAndProcessTransaction(transactionData1)
//   .then(savedTransaction => {
//     console.log("Transaction successfully processed:", savedTransaction);
//   })
//   .catch(err => {
//     console.error("Error during transaction processing:", err);
//   });
//
// // // 将交易数据添加到数据库
// // addTransaction(transactionData)
// //   .then(savedTransaction => {
// //     console.log("Transaction successfully saved:", savedTransaction);
// //   })
// //   .catch(err => {
// //     console.error("Error saving transaction:", err);
// //   });