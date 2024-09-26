import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
const artistRouter = express.Router();

artistRouter.get("/",async  (req,res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch {
        return res.sendStatus(500);
    }
});

artistRouter.post("/",auth, permit('admin'),imagesUpload.single('image'),async  (req,res) => {
    try {
    if (!req.body.name) {
        return res.status(400).send({error: 'All fields are required'});
    }
    const artist = await Artist.create({
        name: req.body.name,
        description: req.body.description,
        image:req.file ? req.file.filename : null,
    });

        return res.status(201).send(artist);
    } catch (error) {
        return res.status(400).send(error);
    }
});
export default artistRouter;