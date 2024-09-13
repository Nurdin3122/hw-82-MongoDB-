import mongoose,{ Types } from 'mongoose';
import Artist from "./Artist";
const Schema = mongoose.Schema;



const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,

    },
    YearOfProduction:{
        type:Number,
        required: true,
    },
    image: String,
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) =>  {
                const artistExists = await Artist.findById(value);
                return Boolean(artistExists);
            },
            message: 'Artist does not exist!',
        },
    },
});



const Album = mongoose.model('Album', AlbumSchema);

export default Album;