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
        const user = localStorage.getItem('persist:music:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user);

        const response = await axiosApi.post<Track>('/tracks', trackMutation,{
            headers:{
                Authorization: `Bearer ${token.token}`
            }
        });
        return response.data
    }
);

export const getTracksOneAlbum = createAsyncThunk<Track[],string>(
    "album/getOneAlbum",
    async (id:string) => {
        const user = localStorage.getItem('persist:music:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user);

        const albumResponse = await axiosApi.get<Track[] | null>(`/tracks?album=${id}`,{
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        });
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
                Authorization: `Bearer ${token.token}`
            }
        });
        return response.data
    }
);


export const deleteTrack = createAsyncThunk(
    "track/deleteTrack",
    async (id:string) => {
        const user = localStorage.getItem('persist:music:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user)

        const response = await axiosApi.delete(`/tracks/${id}`,{
            headers:{
                Authorization: `${token.token}`,
            }
        });
        return response.data;
    }
);

export const isPublishedTrack = createAsyncThunk(
    "artist/isPublishedTrack",
    async (id:string) => {
        const user = localStorage.getItem('persist:music:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user)

        const response = await axiosApi.patch(`/tracks/${id}/togglePublished`, {},{
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        });
        return response.data;
    }
);
