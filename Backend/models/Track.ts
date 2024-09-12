import mongoose,{ Types } from 'mongoose';
import Album from "./Album";
const Schema = mongoose.Schema;



const TrackSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    length:{
        type:String,
        required: true,
        unique: false,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) =>  {
                const albumExists = await Album.findById(value);
                return Boolean(albumExists);
            },
            message: 'album does not exist!',
        },
    },
});



const Track = mongoose.model('Track', TrackSchema);

export default Track;