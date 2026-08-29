import express from "express";
import passport from "passport";
import { createTagRoute, deleteTagRoute, editTagRoute, getTagRoute, getTagsRoute } from "../../services/tags/index.js";
import jwt from 'jsonwebtoken';
const router = express.Router();

// get all roles
router.get('/', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await getTagsRoute(req, res);
});

// create a role
router.post('/', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await createTagRoute(req, res);
});

// get user's role
router.get('/:id', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await getTagRoute(req, res);
});

// edit a role
router.patch('/:id', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await editTagRoute(req, res);
});

// deelte role
router.delete('/:id', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await deleteTagRoute(req, res);
});

export default router;