import {createAsyncThunk} from "@reduxjs/toolkit";
import {Album, AlbumMutation} from "../../Type.ts";
import axiosApi from "../../axiosApi.ts";

export const fetchAlbums = createAsyncThunk<Album[]>(
    'album/fetchAlbum',
    async () => {
        const albumResponse = await axiosApi.get<Album[]>('/albums');
        return albumResponse.data || [];
    }
);


export const createAlbum = createAsyncThunk<void, AlbumMutation>(
    'album/createAlbum',
    async (albumMutation) => {
        console.log(albumMutation,"thunk")
        const formData = new FormData();
        const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
        keys.forEach(key => {
            const value = albumMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });
         await axiosApi.post<Album>(`/albums/${albumMutation.artist}`, formData);

    }
);

export const getOneAlbum = createAsyncThunk<Album[],string>(
    "album/getOneAlbum",
    async (id:string) => {
        const albumResponse = await axiosApi.get<Album[] | null>(`/albums?artist=${id}`);
        return albumResponse.data || [];
    }
)