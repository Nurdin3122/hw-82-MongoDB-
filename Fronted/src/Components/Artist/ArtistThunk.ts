import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist, ArtistMutation} from "../../Type.ts";
import axiosApi from "../../axiosApi.ts";

export const fetchArtists = createAsyncThunk<Artist[]>(
    'artist/fetchAll',
    async () => {
        const artistsResponse = await axiosApi.get<Artist[]>('/artists');
        return artistsResponse.data || [];
    }
);


export const createArtist = createAsyncThunk<void, ArtistMutation>(
    'artist/create',
    async (artistMutation) => {
        const user = localStorage.getItem('persist:music:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user)

        const formData = new FormData();
        const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
        keys.forEach(key => {
            const value = artistMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });
        await axiosApi.post('/artists', formData,{
            headers: {
                Authorization: `${token.token}`,
            }
        });
    }
);



