import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { dbConnect } from "./index.js";

import { userModel } from "../schemas/user.schema.js";
import { roleModel } from "../schemas/role.schema.js";
import { permissionModel } from "../schemas/permission.schema.js";
import { tagModel } from "../schemas/tag.schema.js";
import { categoryModel } from "../schemas/category.schema.js";
import { itemModel } from "../schemas/item.schema.js";
import { shopModel } from "../schemas/home.schema.js";
import { productModel } from "../schemas/home.schema.js";
import { transactionModel } from "../schemas/home.schema.js";

import dotenv from "dotenv";
dotenv.config();

const ReseedAction = () => {
  async function clear() {
    dbConnect();
    await roleModel.deleteMany({});
    await permissionModel.deleteMany({});
    await userModel.deleteMany({});
    await tagModel.deleteMany({});
    await categoryModel.deleteMany({});
    await itemModel.deleteMany({});
    console.log("DB cleared");
  }

  async function seedDB() {
    // first clear DB
    await clear();

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
    const perm1 = await permissionModel({
      created_at: new Date(),
      name: "view users",
    });
    const perm2 = await permissionModel({
      created_at: new Date(),
      name: "create users",
    });
    const perm3 = await permissionModel({
      created_at: new Date(),
      name: "edit users",
    });
    const perm4 = await permissionModel({
      created_at: new Date(),
      name: "delete users",
    });
    // role permission
    const perm5 = await permissionModel({
      created_at: new Date(),
      name: "view roles",
    });
    const perm6 = await permissionModel({
      created_at: new Date(),
      name: "create roles",
    });
    const perm7 = await permissionModel({
      created_at: new Date(),
      name: "edit roles",
    });
    const perm8 = await permissionModel({
      created_at: new Date(),
      name: "delete roles",
    });
    // permission permissions
    const perm9 = await permissionModel({
      created_at: new Date(),
      name: "view permissions",
    });
    // tag permissions
    const perm10 = await permissionModel({
      created_at: new Date(),
      name: "view tags",
    });
    const perm11 = await permissionModel({
      created_at: new Date(),
      name: "create tags",
    });
    const perm12 = await permissionModel({
      created_at: new Date(),
      name: "edit tags",
    });
    const perm13 = await permissionModel({
      created_at: new Date(),
      name: "delete tags",
    });
    // category permissions
    const perm14 = await permissionModel({
      created_at: new Date(),
      name: "view categories",
    });
    const perm15 = await permissionModel({
      created_at: new Date(),
      name: "create categories",
    });
    const perm16 = await permissionModel({
      created_at: new Date(),
      name: "edit categories",
    });
    const perm17 = await permissionModel({
      created_at: new Date(),
      name: "delete categories",
    });
    // items permissions
    const perm18 = await permissionModel({
      created_at: new Date(),
      name: "view items",
    });
    const perm19 = await permissionModel({
      created_at: new Date(),
      name: "create items",
    });
    const perm20 = await permissionModel({
      created_at: new Date(),
      name: "edit items",
    });
    const perm21 = await permissionModel({
      created_at: new Date(),
      name: "delete items",
    });
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
      permissions: [
        perm1._id,
        perm2._id,
        perm3._id,
        perm4._id,
        perm5._id,
        perm6._id,
        perm7._id,
        perm8._id,
        perm9._id,
        perm10._id,
        perm11._id,
        perm12._id,
        perm13._id,
        perm14._id,
        perm15._id,
        perm16._id,
        perm17._id,
        perm18._id,
        perm19._id,
        perm20._id,
        perm21._id,
      ],
    });
    await roleAdmin.save();
    admin.role = roleAdmin._id;
    await admin.save();
    const roleCreator = new roleModel({
      _id: mongoose.Types.ObjectId(2),
      name: "creator",
      created_at: new Date(),
      users: [creator],
      permissions: [
        perm10._id,
        perm11._id,
        perm12._id,
        perm13._id,
        perm14._id,
        perm15._id,
        perm16._id,
        perm17._id,
        perm18._id,
        perm19._id,
        perm20._id,
        perm21._id,
      ],
    });
    await roleCreator.save();
    creator.role = roleCreator._id;
    await creator.save();
    const roleMember = new roleModel({
      _id: mongoose.Types.ObjectId(3),
      name: "member",
      created_at: new Date(),
      users: [member],
      permissions: [perm10._id, perm11._id, perm15._id, perm18._id],
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

    console.log("DB seeded");
  }

  seedDB();
};
// ReseedAction();
export default ReseedAction;
