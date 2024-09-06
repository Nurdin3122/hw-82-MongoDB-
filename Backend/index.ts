import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import artistRouter from "./routers/ArtistRouter";
import albumRouter from "./routers/AlbumRouter";
import trackRouter from "./routers/treckstRouter";
import usersRouter from "./routers/userRouter";
import track_historyRouter from "./routers/track_histoyRouter";


const app = express();
const port = 8008;


app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use('/artists',artistRouter);
app.use('/album', albumRouter);
app.use('/track', trackRouter);
app.use('/users', usersRouter);
app.use('/track_history', track_historyRouter);


const run = async () => {
    await mongoose.connect('mongodb://localhost/music');
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
    process.on('exit', () => {
        mongoose.disconnect();
    });
};
run().catch(console.error);