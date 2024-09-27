import mongoose from "mongoose";


const Schema = mongoose.Schema;


const ArtistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    isPublished: {
        type: Boolean,
        default: false
    },
})

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;