import express from "express";
import passport from "passport";
import fs from 'fs';
import path from "path";

const router = express.Router();

router.get('/users/:id/:name', (req, res) => {
    const id = req.params.id;
    const fileName = req.params.name;
    res.setHeader('Content-Type', 'image/*');
    fs.createReadStream(path.resolve(process.cwd(), `./public/images/users/${id}/${fileName}`)).pipe(res);
});

router.get('/items/:id/:name', (req, res) => {
    const id = req.params.id;
    const fileName = req.params.name;
    res.setHeader('Content-Type', 'image/*');
    fs.createReadStream(path.resolve(process.cwd(), `./public/images/items/${id}/${fileName}`)).pipe(res);
});


router.get('/:name', (req, res) => {
    const fileName = req.params.name;
    res.setHeader('Content-Type', 'image/*');
    fs.createReadStream(path.resolve(process.cwd(), `./public/images/${fileName}`)).pipe(res);
});

export default router;
