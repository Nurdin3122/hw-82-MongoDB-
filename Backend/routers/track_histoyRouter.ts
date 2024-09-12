import express from 'express';
import User from "../models/Users";
import Track_history from "../models/Track_history";
const track_historyRouter = express.Router();
track_historyRouter.post('/', async (req, res) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }
    const track_historyData = new Track_history({
        user: user,
        track: req.body.track,
    });
    try {
        await track_historyData.save();
        res.status(201).send(track_historyData);
    } catch (error) {
        res.status(400).send(error);
    }
});



export default track_historyRouter;

