import mongoose, {Types} from 'mongoose';
import Artist from "./Artist";

const trackHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) =>  {
                const artistExists = await Artist.findById(value);
                return Boolean(artistExists);
            },
            message: 'Artist does not exist!',
        },
    },
    datetime: {
        type: Date, default: Date.now, required: true
    },
});

const TrackHistory = mongoose.model('TrackHistory', trackHistorySchema);
export default TrackHistory;