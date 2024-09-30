import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
const artistRouter = express.Router();


artistRouter.get("/",auth,async  (req:RequestWithUser,res) => {
    try {
        const query: Record<string, any> = {};


        if (req.user && req.user.role !== 'admin') {
            query.$or = [
                { isPublished: true },
            ];
        }


        const artists = await Artist.find(query);
        return res.send(artists);
    } catch {
        return res.sendStatus(500);
    }
});

artistRouter.post("/",auth,imagesUpload.single('image'),async  (req,res) => {
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


artistRouter.patch("/:id/togglePublished",auth,permit("admin"),async (req:RequestWithUser, res) => {
    try {
        const id = req.params.id;
        const artist = await Artist.findById(id);

        if (!artist) {
            return res.status(404).send({ message: 'Artist not found' });
        }

        artist.isPublished = !artist.isPublished;
        await artist.save();

        return res.status(200).send(artist);
    } catch (error) {
        return res.status(500).send({ message: 'Something went wrong' });
    }
});

artistRouter.delete("/:id", auth,permit('admin'), async (req:RequestWithUser, res) => {
    try {
        const artistID = req.params.id;
        await Artist.deleteOne({ _id: artistID });
        return res.status(200).send({ message: 'Artist deleted successfully' });
    } catch (error) {
        return res.status(500).send({ error: 'Failed to delete Artist' });
    }
});

export default artistRouter;