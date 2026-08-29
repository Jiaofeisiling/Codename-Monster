import {categoryModel} from "../../schemas/category.schema.js";
import {transactionModel} from "../../schemas/home.schema.js";

import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

// 获取当前模块的 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getCategoriesRoute = async (req, res) => {
  let categoriesObjectArray = [];
  let jsonArrayCategories = {};

  // pagination
  let paginationSize = null;
  let pageNumber = null;
  if (req.query.page) {
    if (req.query.page.number) {
      pageNumber = +req.query.page.number;
    }
    if (req.query.page.size) {
      paginationSize = +req.query.page.size;
    }
  }

  // filtering
  let filters = {};
  if (req.query.filter) {
    filters = req.query.filter;
  }

  // sorting
  let sortValue;
  if (req.query.sort) {
    sortValue = req.query.sort;
  }

  // choose fields
  let fieldsCategory;
  if (req.query.fields) {
    if (req.query.fields.categories) {
      fieldsCategory = req.query.fields.categories.split(",");
    }
  }

  const allCategories = await categoryModel
    .find(filters)
    .select(fieldsCategory)
    .limit(paginationSize)
    .skip((pageNumber - 1) * paginationSize)
    .sort(sortValue);

  categoriesObjectArray = allCategories.map((element) => {
    let jsonObj = {
      type: "categories",
      id: element.id,
      attributes: {
        ...element._doc,
      },
    };
    return (jsonArrayCategories = {...jsonArrayCategories, ...jsonObj});
  });

  const sentData = {data: [...categoriesObjectArray]};
  return res.status(200).send(sentData);
};

export const getTransactionsRoute = async (req, res) => {
  let transactionsObjectArray = [];
  let jsonArrayTransactions = {};

  // filtering
  let filters = {};
  if (req.query.filter) {
    filters = req.query.filter;
  }

  // sorting
  let sortValue;
  if (req.query.sort) {
    sortValue = req.query.sort;
  }

  // choose fields
  let fieldsTransaction;
  if (req.query.fields) {
    if (req.query.fields.transactions) {
      fieldsTransaction = req.query.fields.transactions.split(",");
    }
  }

  const allTransactions = await transactionModel
    .find(filters)
    .select(fieldsTransaction)
    .sort(sortValue)
    .populate('shop') // populate category reference
    .populate('products'); // populate tags reference

  transactionsObjectArray = allTransactions.map((element) => {
    let jsonObj = {
      type: "transactions",
      id: element.id,
      attributes: {
        ...element._doc,
      },
    };
    return (jsonArrayTransactions = {...jsonArrayTransactions, ...jsonObj});
  });

  const sentData = {data: [...transactionsObjectArray]};
  return res.status(200).send(sentData);
};

export const getCategoryRoute = async (req, res) => {
  const categoryId = req.params.id;

  let fieldsCategory;
  if (req.query.fields) {
    if (req.query.fields.categories) {
      fieldsCategory = req.query.fields.categories.split(",");
    }
  }

  const foundCategory = await categoryModel.findOne({_id: categoryId}).select(fieldsCategory);
  if (!foundCategory) {
    return res
      .status(400)
      .send({errors: [{detail: "The category can not be found"}]});
  }

  const sentData = {
    data: {
      type: "categories",
      id: foundCategory.id,
      attributes: {
        ...foundCategory._doc,
      },
    },
  };
  return res.status(200).send(sentData);
};

export const createCategoryRoute = async (req, res) => {
  const {name, description} = req.body.data.attributes;

  if (!name) {
    return res
      .status(400)
      .send({errors: [{detail: "The name is required"}]});
  }
  if (!description) {
    return res
      .status(400)
      .send({errors: [{detail: "The description is required"}]});
  }

  const existingCategory = await categoryModel.findOne({name: name});
  if (existingCategory) {
    return res
      .status(400)
      .send({errors: [{detail: "The category already exists"}]});
  }
  const newCategory = new categoryModel({
    name: name,
    description: description,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
  newCategory.save();
  const sentData = {
    data: {
      type: "categories",
      id: newCategory.id,
      attributes: {
        ...newCategory._doc
      },
    },
  };
  return res.status(201).send(sentData);
};

export const editCategoryRoute = async (req, res) => {
  const categoryId = req.params.id;
  const {name, description} = req.body.data.attributes;

  if (!name) {
    return res
      .status(400)
      .send({errors: [{detail: "The name is required"}]});
  }
  if (!description) {
    return res
      .status(400)
      .send({errors: [{detail: "The description is required"}]});
  }

  const foundCategory = await categoryModel.findById(categoryId);
  if (!foundCategory) {
    return res
      .status(400)
      .json({errors: [{detail: "No category was found"}]});
  }
  const existingCategoriesWithName = await categoryModel.find({name: name, _id: {$ne: categoryId}});
  if (existingCategoriesWithName.length > 0) {
    return res.status(400).send({
      errors: [{detail: "Already exists a category with this name"}],
    });
  }
  const updatedCategory = await categoryModel.updateOne({_id: categoryId},
    {
      name: name,
      description: description,
      created_at: Date.now(),
      updated_at: Date.now(),
    }
  );

  const sentData = {
    data: {
      type: "categories",
      id: categoryId,
      attributes: {
        ...updatedCategory._doc
      },
    },
  };
  return res.status(200).send(sentData);
};

export const deleteCategoryRoute = async (req, res) => {
  const toDeleteCategory = await categoryModel.findById(req.params.id);

  if (!toDeleteCategory) {
    return res
      .status(400)
      .send({errors: [{detail: "The category does not exist"}]});
  }

  if (toDeleteCategory.items.length > 0) {
    return res.status(400).send({
      errors: [
        {
          title:
            "The category can not be deleted because it is attached to items",
        },
      ],
    });
  }

  try {
    await categoryModel.deleteOne({_id: toDeleteCategory._id});
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
  }
};

// 上传收据图片
export const uploadReceiptImages = async (req, res) => {
  console.log("uploadReceiptImages service called");

  // 设置文件存储路径和文件名
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // 定义文件存储路径
      const uploadPath = path.join(__dirname, '../../../data/receipts');
      // 如果路径不存在，则创建路径
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      // 回调函数，指定文件存储路径
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      // 生成唯一的文件名，防止文件名冲突
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      // 获取文件扩展名
      const ext = path.extname(file.originalname);
      // 重命名文件
      const newFileName = 'image-' + uniqueSuffix + ext;
      // 回调函数，指定文件名
      cb(null, newFileName);
    }
  });

  // 文件过滤器，仅接受图片文件
  const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('仅支持上传图片文件'), false);
    }
  };

  // 初始化 multer 中间件，使用上面定义的存储配置和文件过滤器
  const upload = multer({ storage: storage, fileFilter: fileFilter });

  try {
    // 使用 multer 中间件处理文件上传
    upload.any()(req, res, function (err) {
      if (err) {
        console.error('文件上传失败:', err);
        return res.status(500).json({ message: '文件上传失败', error: err.message });
      }

      // 文件上传成功
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ message: '未选择文件' });
      }

      // 返回上传成功的文件信息，包括重命名后的文件名
      const fileInfos = files.map(file => ({
        originalName: file.originalname,
        newName: file.filename,
        path: file.path
      }));

      return res.status(200).json({
        files: fileInfos
      });
    });
  } catch (error) {
    console.error('上传过程中发生错误:', error);
    return res.status(500).json({ message: '上传过程中发生错误', error: error.message });
  }
};
