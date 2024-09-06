import mongoose from 'mongoose';

const trackHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track', required: true },
    datetime: { type: Date, default: Date.now, required: true },
});

const TrackHistory = mongoose.model('TrackHistory', trackHistorySchema);

export default TrackHistory;