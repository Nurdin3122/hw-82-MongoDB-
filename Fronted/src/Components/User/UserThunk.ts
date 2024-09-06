import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserMutation} from "../../Type.ts";
import axiosApi from "../../axiosApi.ts";

export const createUser = createAsyncThunk<void, UserMutation>(
    'user/createUser',
    async (userMutation) => {
        const response = await axiosApi.post<UserMutation>('/users', userMutation);
        return response.data
    }
);

export const saveUser = createAsyncThunk<void, UserMutation>(
    'user/SaveUser',
    async (userMutation) => {
        const response = await axiosApi.post<UserMutation>('/users/sessions', userMutation);
        return response.data
    }
);