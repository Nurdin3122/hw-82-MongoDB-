import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import artistRouter from "./Routers/ArtistRouter";


const app = express();
const port = 8038;


app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use('/artists',artistRouter);
app.use('/',);
app.use('/',);


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