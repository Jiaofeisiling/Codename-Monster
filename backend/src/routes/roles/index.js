import express from "express";
import passport from "passport";
import { getRolesRoute, getRoleRoute, deleteRoleRoute, createRoleRoute, editRoleRoute } from "../../services/roles/index.js";
import jwt from 'jsonwebtoken';
const router = express.Router();

// get all roles
router.get('/', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await getRolesRoute(req, res);
});

// create a role
router.post('/', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await createRoleRoute(req, res);
});

// get user's role
router.get('/:id', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await getRoleRoute(req, res);
});

// edit a role
router.patch('/:id', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await editRoleRoute(req, res);
});

// deelte role
router.delete('/:id', passport.authenticate('jwt',{session: false}), async (req, res) => {
    await deleteRoleRoute(req, res);
});

export default router;