import {createAsyncThunk} from "@reduxjs/toolkit";
import {User, UserMutation} from "../../Type.ts";
import axiosApi from "../../axiosApi.ts";
import {unsetUser} from "./UserSlice.ts";

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


export const logout = createAsyncThunk<void,void>(
    'users/logout',
    async (_, { dispatch}) => {

        const user = localStorage.getItem('persist:music:user');
        const UserJsonParse = JSON.parse(user);
        const token = JSON.parse(UserJsonParse.user)
        if (!token) {
            throw new Error('User not authenticated');
        }

        await axiosApi.delete('/users/sessions', {
            headers: {
                Authorization: `Bearer ${token.token}`
            }
        });
        dispatch(unsetUser());
    }
);