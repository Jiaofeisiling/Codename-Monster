import express from "express";
import passport from "passport";
import { getPermissionsRoute } from "../../services/permissions/index.js";
import jwt from 'jsonwebtoken';
const router = express.Router();

// get user's profile
router.get("/", passport.authenticate('jwt',{session: false}), async (req, res) => {
    await getPermissionsRoute(req, res);
});

export default router;
