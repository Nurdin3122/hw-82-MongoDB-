import express from "express";
import Artist from "../models/Artist";
import {ArtistWithoutId} from "../type.db";
import {imagesUpload} from "../multer";
const artistRouter = express.Router();

artistRouter.get("/",async  (req,res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch {
        return res.sendStatus(500);
    }
});

artistRouter.post("/",imagesUpload.single('image'),async  (req,res) => {
    if (!req.body.name) {
        return res.status(400).send({error: 'All fields are required'});
    }
    const artistData: ArtistWithoutId = {
        name: req.body.name,
        description: req.body.description,
        image:req.file ? req.file.filename : null,
    };

    const artist = new Artist(artistData);
    try {
        await artist.save();
        return res.status(201).send(artist);
    } catch (error) {
        return res.status(400).send(error);
    }
});
export default artistRouter;