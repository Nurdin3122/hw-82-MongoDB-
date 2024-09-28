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
        const user = localStorage.getItem('persist:music:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user)

        const formData = new FormData();
        const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
        keys.forEach(key => {
            const value = albumMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });
         await axiosApi.post<Album>(`/albums`, formData, {
             headers: {
                 Authorization: `${token.token}`,
             }
         });

    }
);

export const getOneAlbum = createAsyncThunk<Album[],string>(
    "album/getOneAlbum",
    async (id:string) => {
        const albumResponse = await axiosApi.get<Album[] | null>(`/albums?artist=${id}`);
        return albumResponse.data || [];
    }
);



export const deleteAlbum = createAsyncThunk(
    "artist/deleteAlbum",
    async (id:string) => {
        const user = localStorage.getItem('persist:music:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user)

        const response = await axiosApi.delete(`/albums/${id}`,{
            headers:{
                Authorization: `${token.token}`,
            }
        });
        return response.data;
    }
);