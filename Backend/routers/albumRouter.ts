import express from "express";
import {AlbumWithoutId,} from "../type.db";
import Album from "../models/Album";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
const albumRouter = express.Router();

albumRouter.get("/",async  (req,res) => {
    try {
    const { artist } = req.query;
    const query = artist ? { artist } : {};
    if(artist) {
        const trueArtist= await Artist.findById(artist);
        if(!trueArtist) {
            return res.status(400).send("there is not such id artist")
        }
    }

    const albums = await Album.find(query).populate('artist');
    return res.send(albums);
    } catch {
        return res.sendStatus(500);
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


albumRouter.post("/",auth,imagesUpload.single('image'),async  (req,res) => {
    if (!req.body.title) {
        return res.status(400).send({error: 'All fields are required'});
    }
    const albumData:AlbumWithoutId = {
        title: req.body.title,
        YearOfProduction: req.body.YearOfProduction,
        image:req.file ? req.file.filename : null,
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

albumRouter.delete("/:id", auth,permit('admin'), async (req:RequestWithUser, res) => {
    try {
        const albumID = req.params.id;
        await Album.deleteOne({ _id: albumID });
        return res.status(200).send({ message: 'album deleted successfully' });
    } catch (error) {
        return res.status(500).send({ error: 'Failed to delete album' });
    }
});
export default albumRouter;