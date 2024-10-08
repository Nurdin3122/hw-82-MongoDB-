import express from "express";
import {TrackMutation} from "../type.db";
import Album from "../models/Album";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
const trackRouter = express.Router();


trackRouter.get("/",auth, async (req:RequestWithUser, res) => {
    try {
        const { album } = req.query;
        const query:Record<string, any> = album ? { album } : {};

        if (req.user && req.user.role !== 'admin') {
            query.$or = [
                { isPublished: true },
            ];
        }


        if (album) {
            const trueArtist = await Album.findById(album);
            if (!trueArtist) {
                return res.status(400).send("there is no such album with this id");
            }
        }

        const tracks = await Track.find(query).sort({ number: 1 }).populate('album');
        return res.send(tracks);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
});
trackRouter.post("/",auth,async  (req,res) => {
    if (!req.body.name || !req.body.length || !req.body.album) {
        return res.status(400).send({error: 'All fields are required'});
    }
    const trackData:TrackMutation = {
        name: req.body.name,
        length: req.body.length,
        album:req.body.album,
        number:req.body.number,
    };

    const track = new Track(trackData);
    try {
        await track.save();
        return res.status(201).send(track);
    } catch (error) {
        return res.status(400).send(error);
    }
});


trackRouter.delete("/:id", auth,permit('admin'), async (req:RequestWithUser, res) => {
    try {
        const trackID = req.params.id;
        await Track.deleteOne({ _id: trackID });
        return res.status(200).send({ message: 'track deleted successfully' });
    } catch (error) {
        return res.status(500).send({ error: 'Failed to delete track' });
    }
});

trackRouter.patch("/:id/togglePublished",auth,permit("admin"),async (req:RequestWithUser, res) => {
    try {
        const id = req.params.id;
        const track = await Track.findById(id);

        if (!track) {
            return res.status(404).send({ message: 'track not found' });
        }

        track.isPublished = !track.isPublished;
        await track.save();

        return res.status(200).send(track);
    } catch (error) {
        return res.status(500).send({ message: 'Something went wrong' });
    }
});

export default trackRouter;