import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {Track, TrackMutation} from "../../Type.ts";

export const fetchTracks = createAsyncThunk<Track[]>(
    'track/fetchTracks',
    async () => {
        const trackResponse = await axiosApi.get<Track[]>('/tracks');
        return trackResponse.data || [];
    }
);


export const createTrack = createAsyncThunk<void, TrackMutation>(
    'track/createTrack',
    async (trackMutation) => {
        const response = await axiosApi.post<Track>('/tracks', trackMutation);
        return response.data
    }
);

export const getTracksOneAlbum = createAsyncThunk<Track[],string>(
    "album/getOneAlbum",
    async (id:string) => {
        const albumResponse = await axiosApi.get<Track[] | null>(`/tracks?album=${id}`);
        return albumResponse.data || [];
    }
);

export const sendTheTrackHistory = createAsyncThunk(
    "track/sendTheTrackHistory",
    async (trackId:string) => {
        const user = localStorage.getItem('persist:music:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user)
        if (!token) {
            throw new Error('User not authenticated');
        }
        const response = await axiosApi.post<>('/track_histories',{track:trackId} ,{
            headers: {
                Authorization: `${token.token}`,
            }
        });
        return response.data
    }
);
