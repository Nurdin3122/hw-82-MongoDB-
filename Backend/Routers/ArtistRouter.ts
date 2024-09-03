import express from "express";
import Artist from "../Models/Artist";
import {ArtistWithoutId} from "../type.db";
const artistRouter = express.Router();

artistRouter.get("/",async  (req,res) => {
    try {
        const artists = await Artist.find();
        return res.send(artists);
    } catch {
        return res.sendStatus(500);
    }
});

artistRouter.post("/",async  (req,res) => {
    if (!req.body.name) {
        return res.status(400).send({error: 'All fields are required'});
    }
    const artistData: ArtistWithoutId = {
        name: req.body.name,
        description: req.body.description,
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