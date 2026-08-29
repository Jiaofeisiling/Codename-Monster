import express from "express";
import passport from "passport";
import { getItemsRoute, getItemRoute, createItemRoute, editItemRoute, deleteItemRoute, getCategoryOfItemRoute, getTagsOfItemRoute } from "../../services/items/index.js";
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await getItemsRoute(req, res);
})

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await createItemRoute(req, res);
})

router.get("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await getItemRoute(req, res);
});

router.patch("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await editItemRoute(req, res);
});

router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await deleteItemRoute(req, res);
});

router.get("/:id/category", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await getCategoryOfItemRoute(req, res);
})

router.get("/:id/tags", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await getTagsOfItemRoute(req, res);
})

export default router;