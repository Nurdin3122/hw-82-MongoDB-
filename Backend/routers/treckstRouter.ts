import express from "express";
import {TrackMutation} from "../type.db";
import Album from "../models/Album";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
const trackRouter = express.Router();

trackRouter.get("/", async (req, res) => {
    try {
        const { album } = req.query;
        const query = album ? { album } : {};

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

export default trackRouter;