/*
import express from "express"; // 引入 Express 框架
import bodyParser from "body-parser/index.js"; // 引入 body-parser 中间件，用于解析请求体
import cors from "cors"; // 引入 cors 中间件，用于处理跨域请求
import dotenv from "dotenv"; // 引入 dotenv，用于加载环境变量
import "./passport.js"; // 引入 passport 配置文件，用于身份验证
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; // 引入 path 模块的 dirname 方法，用于获取目录名
import * as fs from "fs"; // 引入 fs 模块，用于文件系统操作
import {
  itemRoutes,
  userRoutes,
  meRoutes,
  authRoutes,
  roleRoutes,
  uploadRoutes,
  categoryRoutes,
  tagRoutes,
  permissionRoutes,
  imageRoutes,
  homeRoutes
} from "./routes/index.js"; // 引入各个路由模块
import { dbConnect } from "./mongoose/index.js"; // 引入数据库连接函数
import path from "path"; // 引入 path 模块，用于处理文件路径

import { ExtractJwt } from "passport-jwt"; // 引入 passport-jwt 的 ExtractJwt 方法，用于从请求中提取 JWT
import passportJWT from "passport-jwt"; // 引入 passport-jwt 模块，用于 JWT 身份验证
import passport from "passport"; // 引入 passport 模块，用于身份验证
import cron from "node-cron"; // 引入 node-cron 模块，用于定时任务
import ReseedAction from "./mongoose/RessedAction.js"; // 引入 ReseedAction 模块，用于定时任务操作

import { userModel } from "./schemas/user.schema.js"; // 引入用户模型
const JWTStrategy = passportJWT.Strategy; // 创建 JWT 策略实例

dotenv.config(); // 加载环境变量

const PORT = process.env.PORT || 8080; // 设置服务器端口，默认为 8080
const app = express(); // 创建 Express 应用实例

// 设置 CORS 白名单
// const whitelist = [process.env.APP_URL_CLIENT, process.env.APP_URL_CLIENT_1, 'https://bw3x0fsv-3000.inc1.devtunnels.ms', '192.168.0.137:3000', '43.225.208.246'];
const whitelist = [process.env.APP_URL_CLIENT];
const corsOptions = {
  origin: function (origin, callback) {
    // console.log(origin); // 打印请求来源
    // console.log(whitelist); // 打印白名单
    if (!origin || whitelist.indexOf(origin) !== -1) { // 如果请求来源在白名单中
      callback(null, true); // 允许请求
    } else {
      callback(new Error("Not allowed by CORS")); // 否则拒绝请求
    }
  },
  credentials: true, // 允许携带凭证（如 cookies）
};

dbConnect(); // 连接数据库

app.use(cors(corsOptions)); // 使用 CORS 中间件
// app.use(bodyParser.json({ type: "application/vnd.api+json", strict: false })); // 使用 body-parser 中间件解析 JSON 请求体
app.use(bodyParser.json({ type: ["application/json", "application/vnd.api+json"] }));

// 获取 __dirname 的替代方案
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/data', express.static(path.join(__dirname, 'data')));

// 定义根路由，返回 landing 页面的 HTML 文件
app.get("/", function (req, res) {
  const __dirname = fs.realpathSync("."); // 获取当前目录的绝对路径
  res.sendFile(path.join(__dirname, "/src/landing/index.html")); // 发送 HTML 文件
});

// 使用各个路由模块
app.use("/", authRoutes); // 认证相关路由
app.use("/me", meRoutes); // 用户个人信息相关路由
app.use("/uploads", uploadRoutes); // 文件上传相关路由
app.use("/users", userRoutes); // 用户相关路由
app.use("/roles", roleRoutes); // 角色相关路由
app.use("/categories", categoryRoutes); // 分类相关路由
app.use("/tags", tagRoutes); // 标签相关路由
app.use("/items", itemRoutes); // 项目相关路由
app.use("/permissions", permissionRoutes); // 权限相关路由
app.use("/public/images", imageRoutes); // 图片相关路由
app.use("/transactions", homeRoutes); // 交易相关路由

// 如果设置了定时任务的小时数，则启动定时任务
if (process.env.SCHEDULE_HOUR) {
  cron.schedule(`0 *!/${process.env.SCHEDULE_HOUR} * * *'`, () => {
    ReseedAction(); // 执行定时任务
  });
}

app.post("/login", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  res.send("Request received");
});

// 设置 CORS 允许前端访问
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // 允许前端域名
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 启动服务器，监听指定端口
app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));*/
// 1. 核心依赖导入
import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import path from "path";
import * as fs from "fs";

// 2. 中间件相关导入
import bodyParser from "body-parser/index.js";
import cors from "cors";
import passport from "passport";
import passportJWT from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

// 3. 自定义模块导入
import "./passport.js";
import { dbConnect } from "./mongoose/index.js";
import {
  itemRoutes,
  userRoutes,
  meRoutes,
  authRoutes,
  roleRoutes,
  uploadRoutes,
  categoryRoutes,
  tagRoutes,
  permissionRoutes,
  imageRoutes,
  homeRoutes
} from "./routes/index.js";

// 4. 定时任务相关导入
import cron from "node-cron";
import ReseedAction from "./mongoose/RessedAction.js";
import { userModel } from "./schemas/user.schema.js";

// 环境变量配置
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

// CORS 配置
const whitelist = [process.env.APP_URL_CLIENT];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// 数据库连接
dbConnect();

// 中间件配置
app.use(cors(corsOptions));
app.use(bodyParser.json({ type: ["application/json", "application/vnd.api+json"] }));

// 静态文件配置
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// 获取项目根目录
const rootDir = path.join(__dirname, '..');
app.use('/data', express.static(path.join(rootDir, 'data')));

// 根路由配置
app.get("/", function (req, res) {
  const __dirname = fs.realpathSync(".");
  res.sendFile(path.join(__dirname, "/src/landing/index.html"));
});

// API 路由配置
app.use("/", authRoutes);
app.use("/me", meRoutes);
app.use("/uploads", uploadRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/categories", categoryRoutes);
app.use("/tags", tagRoutes);
app.use("/items", itemRoutes);
app.use("/permissions", permissionRoutes);
app.use("/public/images", imageRoutes);
app.use("/transactions", homeRoutes);

// 定时任务配置
if (process.env.SCHEDULE_HOUR) {
  cron.schedule(`0 */${process.env.SCHEDULE_HOUR} * * *'`, () => {
    ReseedAction();
  });
}

// 全局 CORS 配置
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 服务器启动
app.listen(PORT, () => console.log(`Server listening to port ${PORT}`));
