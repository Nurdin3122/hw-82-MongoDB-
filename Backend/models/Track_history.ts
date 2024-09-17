import mongoose, {Types} from 'mongoose';
import Track from "./Track";

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
                const artistExists = await Track.findById(value);
                return Boolean(artistExists);
            },
            message: 'Track does not exist!',
        },
    },
    datetime: {
        type: Date, default: Date.now, required: true
    },
});

const TrackHistory = mongoose.model('TrackHistory', trackHistorySchema);
export default TrackHistory;