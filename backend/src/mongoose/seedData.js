import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {dbConnect} from "./index.js";

import {userModel} from "../schemas/user.schema.js";
import {roleModel} from "../schemas/role.schema.js";
import {permissionModel} from "../schemas/permission.schema.js";
import {tagModel} from "../schemas/tag.schema.js";
import {categoryModel} from "../schemas/category.schema.js";
import {itemModel} from "../schemas/item.schema.js";
import {productModel, transactionModel} from "../schemas/home.schema.js";

import dotenv from 'dotenv';

dotenv.config();


export async function seedDB() {
  // connect do db
  dbConnect();

  // crypt default password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash("secret", salt);
  const admin = new userModel({
    _id: mongoose.Types.ObjectId(1),
    name: "Admin",
    email: "admin@jsonapi.com",
    password: hashPassword,
    created_at: new Date(),
    profile_image: `${process.env.APP_URL_API}/public/images/admin.jpg`,
  });
  const creator = new userModel({
    _id: mongoose.Types.ObjectId(2),
    name: "Creator",
    email: "creator@jsonapi.com",
    password: hashPassword,
    created_at: new Date(),
    profile_image: `${process.env.APP_URL_API}/public/images/creator.jpg`,
  });
  const member = new userModel({
    _id: mongoose.Types.ObjectId(3),
    name: "Member",
    email: "member@jsonapi.com",
    password: hashPassword,
    created_at: new Date(),
    profile_image: `${process.env.APP_URL_API}/public/images/member.jpg`,
  });

  // user permission
  const perm1 = await permissionModel({created_at: new Date(), name: "view users"});
  const perm2 = await permissionModel({created_at: new Date(), name: "create users"});
  const perm3 = await permissionModel({created_at: new Date(), name: "edit users"});
  const perm4 = await permissionModel({created_at: new Date(), name: "delete users"});
  // role permission
  const perm5 = await permissionModel({created_at: new Date(), name: "view roles"});
  const perm6 = await permissionModel({created_at: new Date(), name: "create roles"});
  const perm7 = await permissionModel({created_at: new Date(), name: "edit roles"});
  const perm8 = await permissionModel({created_at: new Date(), name: "delete roles"});
  // permission permissions
  const perm9 = await permissionModel({created_at: new Date(), name: "view permissions"});
  // tag permissions
  const perm10 = await permissionModel({created_at: new Date(), name: "view tags"});
  const perm11 = await permissionModel({created_at: new Date(), name: "create tags"});
  const perm12 = await permissionModel({created_at: new Date(), name: "edit tags"});
  const perm13 = await permissionModel({created_at: new Date(), name: "delete tags"});
  // category permissions
  const perm14 = await permissionModel({created_at: new Date(), name: "view categories"});
  const perm15 = await permissionModel({created_at: new Date(), name: "create categories"});
  const perm16 = await permissionModel({created_at: new Date(), name: "edit categories"});
  const perm17 = await permissionModel({created_at: new Date(), name: "delete categories"});
  // items permissions
  const perm18 = await permissionModel({created_at: new Date(), name: "view items"});
  const perm19 = await permissionModel({created_at: new Date(), name: "create items"});
  const perm20 = await permissionModel({created_at: new Date(), name: "edit items"});
  const perm21 = await permissionModel({created_at: new Date(), name: "delete items"});
  await permissionModel.insertMany([
    perm1,
    perm2,
    perm3,
    perm4,
    perm5,
    perm6,
    perm7,
    perm8,
    perm9,
    perm10,
    perm11,
    perm12,
    perm13,
    perm14,
    perm15,
    perm16,
    perm17,
    perm18,
    perm19,
    perm20,
    perm21,
  ]);

  const roleAdmin = new roleModel({
    _id: mongoose.Types.ObjectId(1),
    name: "admin",
    created_at: new Date(),
    users: [admin],
    permissions: [perm1._id, perm2._id, perm3._id, perm4._id, perm5._id, perm6._id, perm7._id, perm8._id,
      perm9._id, perm10._id, perm11._id, perm12._id, perm13._id, perm14._id, perm15._id, perm16._id, perm17._id, perm18._id, perm19._id, perm20._id, perm21._id]
  });
  await roleAdmin.save();
  admin.role = roleAdmin._id;
  await admin.save();
  const roleCreator = new roleModel({
    _id: mongoose.Types.ObjectId(2),
    name: "creator",
    created_at: new Date(),
    users: [creator],
    permissions: [perm10._id, perm11._id, perm12._id, perm13._id, perm14._id, perm15._id, perm16._id, perm17._id, perm18._id, perm19._id, perm20._id, perm21._id]
  });
  await roleCreator.save();
  creator.role = roleCreator._id;
  await creator.save();
  const roleMember = new roleModel({
    _id: mongoose.Types.ObjectId(3),
    name: "member",
    created_at: new Date(),
    users: [member],
    permissions: [perm10._id, perm11._id, perm15._id, perm18._id]
  });
  await roleMember.save();
  member.role = roleMember._id;
  await member.save();

  const cat1 = new categoryModel({
    name: "Travel",
    description: "Travel ideas for everyone",
    created_at: new Date(),
  });
  const cat2 = new categoryModel({
    name: "Food",
    description: "Our favourite recipes",
    created_at: new Date(),
  });
  const cat3 = new categoryModel({
    name: "Home",
    description: "The latest trends in home decorations",
    created_at: new Date(),
  });
  const cat4 = new categoryModel({
    name: "Fashion",
    description: "Stay in touch with the latest trends",
    created_at: new Date(),
  });
  const cat5 = new categoryModel({
    name: "Health",
    description: "An apple a day keeps the doctor away",
    created_at: new Date(),
  });
  const item1 = new itemModel({
    name: "5 citybreak ideas for this year",
    status: "published",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet nulla nulla. Donec luctus lorem justo, ut ullamcorper eros pellentesque ut. Etiam scelerisque dapibus lorem, vitae maximus ante condimentum quis. Maecenas ac arcu a lacus aliquet elementum posuere id nunc. Curabitur sem lorem, faucibus ac enim ut, vestibulum feugiat ante. Fusce hendrerit leo nibh, nec consectetur nulla venenatis et. Nulla tincidunt neque quam, sit amet tincidunt quam blandit in. Nunc fringilla rutrum tortor, sit amet bibendum augue convallis a. Etiam mauris orci, sollicitudin eu condimentum sed, dictum ut odio. Sed vel ligula in lectus scelerisque ornare.Mauris dolor nisl, finibus eget sem in, ultrices semper libero. Nullam accumsan suscipit tortor, a vestibulum sapien imperdiet quis. Donec pretium mauris quis lectus sodales accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec tincidunt semper orci eu molestie. Vivamus fermentum enim vitae magna elementum, quis iaculis augue tincidunt. Donec fermentum quam facilisis sem dictum rutrum. Nunc nec urna lectus. Nulla nec ultrices lorem. Integer ac ante massa.",
    image: `${process.env.APP_URL_API}/public/images/product.jpg`,
    is_on_homepage: false,
    date_at: new Date(),
    created_at: new Date(),
  });
  item1.category_id = cat1._id;
  const item2 = new itemModel({
    name: "Top 10 restaurants in Italy",
    status: "published",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet nulla nulla. Donec luctus lorem justo, ut ullamcorper eros pellentesque ut. Etiam scelerisque dapibus lorem, vitae maximus ante condimentum quis. Maecenas ac arcu a lacus aliquet elementum posuere id nunc. Curabitur sem lorem, faucibus ac enim ut, vestibulum feugiat ante. Fusce hendrerit leo nibh, nec consectetur nulla venenatis et. Nulla tincidunt neque quam, sit amet tincidunt quam blandit in. Nunc fringilla rutrum tortor, sit amet bibendum augue convallis a. Etiam mauris orci, sollicitudin eu condimentum sed, dictum ut odio. Sed vel ligula in lectus scelerisque ornare.Mauris dolor nisl, finibus eget sem in, ultrices semper libero. Nullam accumsan suscipit tortor, a vestibulum sapien imperdiet quis. Donec pretium mauris quis lectus sodales accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec tincidunt semper orci eu molestie. Vivamus fermentum enim vitae magna elementum, quis iaculis augue tincidunt. Donec fermentum quam facilisis sem dictum rutrum. Nunc nec urna lectus. Nulla nec ultrices lorem. Integer ac ante massa.",
    image: `${process.env.APP_URL_API}/public/images/product.jpg`,
    is_on_homepage: false,
    date_at: new Date(),
    created_at: new Date(),
  });
  item2.category_id = cat2._id;
  const item3 = new itemModel({
    name: "Cocktail ideas for your birthday party",
    status: "published",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet nulla nulla. Donec luctus lorem justo, ut ullamcorper eros pellentesque ut. Etiam scelerisque dapibus lorem, vitae maximus ante condimentum quis. Maecenas ac arcu a lacus aliquet elementum posuere id nunc. Curabitur sem lorem, faucibus ac enim ut, vestibulum feugiat ante. Fusce hendrerit leo nibh, nec consectetur nulla venenatis et. Nulla tincidunt neque quam, sit amet tincidunt quam blandit in. Nunc fringilla rutrum tortor, sit amet bibendum augue convallis a. Etiam mauris orci, sollicitudin eu condimentum sed, dictum ut odio. Sed vel ligula in lectus scelerisque ornare.Mauris dolor nisl, finibus eget sem in, ultrices semper libero. Nullam accumsan suscipit tortor, a vestibulum sapien imperdiet quis. Donec pretium mauris quis lectus sodales accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec tincidunt semper orci eu molestie. Vivamus fermentum enim vitae magna elementum, quis iaculis augue tincidunt. Donec fermentum quam facilisis sem dictum rutrum. Nunc nec urna lectus. Nulla nec ultrices lorem. Integer ac ante massa.",
    image: `${process.env.APP_URL_API}/public/images/product.jpg`,
    is_on_homepage: false,
    date_at: new Date(),
    created_at: new Date(),
  });
  item3.category_id = cat3._id;
  const tag1 = new tagModel({
    name: "Hot",
    color: "#f44336",
    created_at: new Date(),
  });
  const tag2 = new tagModel({
    name: "Trending",
    color: "#9c27b0",
    created_at: new Date(),
  });
  const tag3 = new tagModel({
    name: "New",
    color: "#00bcd4",
    created_at: new Date(),
  });
  tag1.items.push(item1, item3);
  tag2.items.push(item1, item2, item3);
  tag3.items.push(item2, item3);
  cat1.items.push(item1);
  cat2.items.push(item2);
  cat3.items.push(item3);
  await categoryModel.insertMany([cat1, cat2, cat3, cat4, cat5]);
  await tagModel.insertMany([tag1, tag2, tag3]);
  item1.tags.push(tag1);
  item1.tags.push(tag2);
  item2.tags.push(tag3);
  item2.tags.push(tag2);
  item3.tags.push(tag1);
  item3.tags.push(tag2);
  item3.tags.push(tag3);
  await itemModel.insertMany([item1, item2, item3]);


// // Sample data
//
//   const transaction1 = new transactionModel(
//     {
//       date: new Date(),
//       shop: {
//         name: "Example Shop",
//         address: "123 Example Street",
//         phone_number: "09 1403-5913",
//         category: "Shopping",
//       },
//       products: [
//         {name: "MINCE", quantity: 0.846, unit_price: 10.74},
//         {name: "TOMATO BASIL 185G", quantity: 2.202, unit_price: 10.89},
//         {name: "TUNA", quantity: 1.162, unit_price: 1.3},
//       ],
//       total_quantity: 3,
//       total_price: 34.58,
//       currency: "AAA",
//     });
//
//   const transaction2 = new transactionModel(
//     {
//       date: new Date(),
//       shop: {
//         name: "Second Shop",
//         address: "456 Another Street",
//         phone_number: "09 1234-5678",
//         category: "Groceries",
//       },
//       products: [
//         {name: "APPLE", quantity: 1.5, unit_price: 3.0},
//         {name: "BANANA", quantity: 2.0, unit_price: 1.2},
//       ],
//       total_quantity: 3.5,
//       total_price: 6.6,
//       currency: "USD",
//     });
//
//   const transaction3 = new transactionModel(
//     {
//       date: new Date(),
//       shop: {
//         name: "Tech Store",
//         address: "789 Tech Avenue",
//         phone_number: "09 8765-4321",
//         category: "Electronics",
//       },
//       products: [
//         {name: "USB-C CABLE", quantity: 2, unit_price: 15.99},
//         {name: "HDMI ADAPTER", quantity: 1, unit_price: 25.49},
//       ],
//       total_quantity: 3,
//       total_price: 57.47,
//       currency: "EUR",
//     });
//
//   const transaction4 = new transactionModel(
//     {
//       date: new Date(),
//       shop: {
//         name: "Gadget Store",
//         address: "101 Tech Park Road",
//         phone_number: "09 2345-6789",
//         category: "Electronics",
//       },
//       products: [
//         {name: "WIRELESS MOUSE", quantity: 1, unit_price: 20.99},
//         {name: "KEYBOARD", quantity: 1, unit_price: 45.50},
//       ],
//       total_quantity: 2,
//       total_price: 66.49,
//       currency: "GBP",
//     });
//
//   const transaction5 = new transactionModel(
//     {
//       date: new Date(),
//       shop: {
//         name: "Healthy Grocer",
//         address: "200 Wellness Avenue",
//         phone_number: "09 5678-1234",
//         category: "Groceries",
//       },
//       products: [
//         {name: "BROCCOLI", quantity: 1.2, unit_price: 4.5},
//         {name: "CARROT", quantity: 2.5, unit_price: 2.3},
//         {name: "AVOCADO", quantity: 0.8, unit_price: 3.5},
//       ],
//       total_quantity: 4.5,
//       total_price: 19.35,
//       currency: "NZD",
//     });
//
//   const transaction6 = new transactionModel(
//     {
//       date: new Date(),
//       shop: {
//         name: "Fashion Hub",
//         address: "12 Stylish Street",
//         phone_number: "09 6789-2345",
//         category: "Fashion",
//       },
//       products: [
//         {name: "T-SHIRT", quantity: 2, unit_price: 12.99},
//         {name: "JEANS", quantity: 1, unit_price: 45.5},
//       ],
//       total_quantity: 3,
//       total_price: 71.48,
//       currency: "USD",
//     });
//
//
//
//   const transaction8 = new transactionModel(
//     {
//       date: new Date(),
//       shop: {
//         name: "Home Essentials",
//         address: "78 Comfort Avenue",
//         phone_number: "09 3456-7890",
//         category: "Home Goods",
//       },
//       products: [
//         {name: "CUSHION", quantity: 3, unit_price: 12.99},
//         {name: "BLANKET", quantity: 2, unit_price: 25.5},
//       ],
//       total_quantity: 5,
//       total_price: 86.47,
//       currency: "AUD",
//     });
//
//   const transaction9 = new transactionModel(
//     {
//       date: new Date(),
//       shop: {
//         name: "Supermart",
//         address: "99 Supermarket Street",
//         phone_number: "09 9876-5432",
//         category: "Groceries",
//       },
//       products: [
//         {name: "BREAD", quantity: 1, unit_price: 1.2},
//         {name: "MILK", quantity: 2, unit_price: 1.5},
//         {name: "EGGS", quantity: 1.5, unit_price: 3.2},
//       ],
//       total_quantity: 4.5,
//       total_price: 9.9,
//       currency: "USD",
//     });
//
//   const transaction10 = new transactionModel(
//     {
//       date: new Date(),
//       shop: {
//         name: "Cinema Corner",
//         address: "45 Movie Lane",
//         phone_number: "09 3210-5432",
//         category: "Entertainment",
//       },
//       products: [
//         {name: "MOVIE TICKET", quantity: 2, unit_price: 12.0},
//         {name: "POP CORN", quantity: 1, unit_price: 5.5},
//       ],
//       total_quantity: 3,
//       total_price: 29.5,
//       currency: "GBP",
//     });
//
//
//   // Insert sample data into the database
//   await transactionModel.insertMany([transaction1, transaction2, transaction3, transaction4, transaction5,
//     transaction6, transaction7, transaction8, transaction9, transaction10]);
//
//   const product1 = new productModel(
//     {
//       name: { required: true, type: String },
//       quantity: { required: true, type: Number },
//       unit_price: { required: true, type: Number },
//   });

  console.log("DB seeded");
}

seedDB().then(() => {
  mongoose.connection.close();
});
