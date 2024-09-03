import express from "express";
import {AlbumWithoutId,} from "../type.db";
import Album from "../Models/Album";
import Artist from "../Models/Artist";
const albumRouter = express.Router();

albumRouter.get("/",async  (req,res) => {
    try {
    const { artist } = req.query;
    const query = artist ? { artist } : {};
    if(artist) {
        const trueArtist= await Artist.findById(artist);
        if(!trueArtist) {
            res.status(400).send("there is not such id artist")
        }
    }

    const albums = await Album.find(query).populate('artist');
    return res.send(albums);
    } catch {
        return res.sendStatus(500);
    }
});

albumRouter.post("/",async  (req,res) => {
    if (!req.body.title) {
        return res.status(400).send({error: 'All fields are required'});
    }
    const albumData:AlbumWithoutId = {
        title: req.body.title,
        YearOfProduction: req.body.YearOfProduction,
        artist:req.body.artist
    };

    const album = new Album(albumData);
    try {
        await album.save();
        return res.status(201).send(album);
    } catch (error) {
        return res.status(400).send(error);
    }
});


albumRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const album = await Album.findById(id).populate('artist');
        if (!album) {
            return res.status(404).send({ error: 'Album not found' });
        }
        return res.send(album);
    } catch (error) {
        return res.status(500).send(error);
    }
});
export default albumRouter;