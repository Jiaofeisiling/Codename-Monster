import express from "express";
import passport from "passport";
import multer from "multer";
import { fs } from "file-system";
import { v4 as uuidv4 } from 'uuid';
import { setItemImage, setUserProfileImageRoute } from "../../services/uploads/index.js";
import jwt from "jsonwebtoken";
import path from "path";

const router = express.Router();
const randomId = uuidv4();

const storageUsers = multer.diskStorage({
  destination: function (req, file, cb) {
    const id = req.params.id;
    if (!fs.existsSync('./public/images/users/')){
      fs.mkdirSync('./public/images/users/');
    }
    const path = `./public/images/users/${id}`;
    fs.mkdirSync(path, { recursive: true })
    return cb(null, path)
  },
  filename: function (req, file, cb) {
      cb(null, `${randomId}-${file.originalname}`);
  }
});

const storageItems = multer.diskStorage({
  destination: function (req, file, cb) {
    const id = req.params.id;
    if (!fs.existsSync('./public/images/items/')){
      fs.mkdirSync('./public/images/items/');
    }
    const path = `./public/images/items/${id}`;
    fs.mkdirSync(path, { recursive: true })
    return cb(null, path)
  },
  filename: function (req, file, cb) {
      cb(null, `${randomId}-${file.originalname}`);
  }
});
const uploadStorageUsers = multer({ storage: storageUsers });
const uploadStoageItems = multer({ storage: storageItems });

router.post("/users/:id/profile-image", uploadStorageUsers.single('attachment'), async (req, res) => {
  await setUserProfileImageRoute(randomId, req, res);
});

router.post("/items/:id/image", uploadStoageItems.single('attachment'), passport.authenticate("jwt", { session: false }), async (req, res) => {
  await setItemImage(randomId, req, res);
});
export default router;
