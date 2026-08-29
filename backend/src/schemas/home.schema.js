import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const priceHistorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { required: true, type: String },
  quantity: { required: true, type: Number, min: [0, 'Price cannot be negative'] },
  unit_price: { required: true, type: Number },
  shop: {required: true, type: mongoose.Schema.Types.ObjectId, ref: "Shop"},
});

productSchema.methods.addPriceHistory = function (shopId, price) {
  const priceHistoryEntry = new PriceHistory({
    product: this._id,
    shop: shopId,
    price: price,
    date: new Date()
  });

  // 保存价格历史记录
  return priceHistoryEntry.save().then(() => {
    // 更新商品的当前价格
    this.unit_price = price;
    return this.save();
  });
};

const shopSchema = new mongoose.Schema({
  name: { required: true, type: String },
  address: { required: true, type: String, unique: true },
  phone_number: { required: true, type: String },
  category: { required: true, type: String },
});

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: String, default: uuidv4, unique: true }, // 添加唯一性约束
  transaction_time: { type: Date, default: Date.now }, // 交易发生时间，默认为当前时间
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  products: { type: [mongoose.Schema.Types.ObjectId], ref: "Product", required: true },
  total_quantity: { type: Number, required: true },
  total_price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
  currency: { type: String, required: true },
  note: { type: String, maxlength: [500] },
  image_path: { type: String, required: true }
});

transactionSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
transactionSchema.set('timestamps', true);
transactionSchema.set("toJSON", { virtuals: true });


export const PriceHistory = mongoose.model('PriceHistory', priceHistorySchema);
export const productModel = mongoose.model("Product", productSchema);
export const shopModel = mongoose.model("Shop", shopSchema);
export const transactionModel = mongoose.model("Transaction", transactionSchema);
