import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, AlbumMutation} from "../../Type.ts";
import axiosApi from "../../axiosApi.ts";

export const fetchAlbums = createAsyncThunk<Album[]>(
    'album/fetchAlbum',
    async () => {
        const albumResponse = await axiosApi.get<Album[]>('/album');
        return albumResponse.data || [];
    }
);


export const createAlbum = createAsyncThunk<null, AlbumMutation>(
    'album/createAlbum',
    async (albumMutation) => {
        const response = await axiosApi.post<Album>('/album', albumMutation);
        return response.data
    }
);