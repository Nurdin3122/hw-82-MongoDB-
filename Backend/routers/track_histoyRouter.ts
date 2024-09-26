import express from 'express';
import Track_history from "../models/Track_history";
import auth, {RequestWithUser} from "../middleware/auth";
const track_historyRouter = express.Router();

track_historyRouter.post('/',auth, async (req:RequestWithUser, res) => {
    try {

        if (!req.user) {
            return res.status(401).send({ error: "User not found" });
        }


    const track_historyData = new Track_history({
        user: req.user,
        track: req.body.track,
    });
        await track_historyData.save();
        return res.status(201).send(track_historyData);
    } catch (error) {
        res.status(400).send(error);
    }
});



export default track_historyRouter;

