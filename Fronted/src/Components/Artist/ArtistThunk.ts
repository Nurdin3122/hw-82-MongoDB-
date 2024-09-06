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


export const createArtist = createAsyncThunk<null, ArtistMutation>(
    'artist/create',
    async (artistMutation) => {
        const response = await axiosApi.post<Artist>('/artists', artistMutation);
        return response.data
    }
);



