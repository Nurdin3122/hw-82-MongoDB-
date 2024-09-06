import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Track, TrackMutation} from "../../Type.ts";

export const fetchTracks = createAsyncThunk<Track[]>(
    'track/fetchTracks',
    async () => {
        const trackResponse = await axiosApi.get<Track[]>('/track');
        return trackResponse.data || [];
    }
);


export const createTrack = createAsyncThunk<void, TrackMutation>(
    'track/createTrack',
    async (trackMutation) => {
        const response = await axiosApi.post<Track>('/track', trackMutation);
        return response.data
    }
);