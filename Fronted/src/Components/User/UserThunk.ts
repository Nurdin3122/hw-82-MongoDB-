import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, UserMutation} from "../../Type.ts";
import axiosApi from "../../axiosApi.ts";

export const createUser = createAsyncThunk<User, UserMutation>(
    'user/createUser',
    async (userMutation) => {
        const response = await axiosApi.post<UserMutation>('/users', userMutation);
        return response.data
    }
);

export const saveUser = createAsyncThunk<User, UserMutation>(
    'user/SaveUser',
    async (userMutation) => {
        const response = await axiosApi.post<UserMutation>('/users/sessions', userMutation);
        return response.data
    }
);