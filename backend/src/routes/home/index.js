import express from "express";
import passport from "passport";
import {getTransactionsRoute, uploadReceiptImages} from "../../services/home/index.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { processReceipt } from '../../aiServices/geminiApi.cjs';
// const {processReceiptGemini} = require('../../aiServices/geminiApi.cjs');
import { dbConnectAndProcessTransaction } from '../../mongoose/addTransaction.js';
import { validateTransactionData } from '../../mongoose/checking/transactionValidator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// router.use(bodyParser.json());

// get all transactions
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  await getTransactionsRoute(req, res);
});

// // create a category
// router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
//   await createCategoryRoute(req, res);
// });
//
// // get selected category
// router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
//   await getCategoryRoute(req, res);
// });
//
// // edit selected category
// router.patch('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
//   await editCategoryRoute(req, res);
// });
//
// // delete category
// router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
//   await deleteCategoryRoute(req, res);
// });

router.post('/receipt-upload', passport.authenticate('jwt', {session: false}), async (req, res) => {
  console.log("uploadReceiptImages route called");
  await uploadReceiptImages(req, res);
});

router.post('/process-receipt_gemini', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { imagePath } = req.body;  // 从请求体中获取图片路径

  if (!imagePath) {
    return res.status(400).json({ error: 'Image path is required' });
  }

  try {
    // 调用 processReceipt 函数进行处理，并将其返回的数据存储在 result 中
    const result = await processReceipt(imagePath);

    // 返回处理结果到前端
    res.status(200).json({
      message: 'Receipt processing started successfully',
      data: result,  // 将处理结果作为返回数据
    });
  } catch (error) {
    console.error('Error processing receipt:', error);
    res.status(500).json({ error: 'Failed to process receipt' });
  }
});

router.get('/get-receipt-image', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const fileName = req.query.fileName;
  if (!fileName) {
    return res.status(400).send('文件名是必需的');
  }

  const filePath = path.resolve(__dirname, '..', '..', '..', 'data', 'receipts', fileName);
  console.log(filePath);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('图片未找到');
    }

    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).send('服务器错误');
      }
    });
  });
});

router.post('/add_transaction', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const transactionData = { ...req.body, user: req.user._id };

    // 可选：验证数据是否有效
    const validationError = validateTransactionData(transactionData);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // 调用服务处理逻辑并保存数据
    const savedTransaction = await dbConnectAndProcessTransaction(transactionData);

    // 返回成功响应
    res.status(201).json({ message: 'Transaction successfully saved', transaction: savedTransaction });
  } catch (error) {
    console.error("Error in /add-transaction route:", error);
    res.status(500).json({ error: "An error occurred while saving the transaction" });
  }
});

export default router;
