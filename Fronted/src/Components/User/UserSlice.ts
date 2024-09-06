import {User} from "../../Type.ts";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store.ts";
import {createUser, saveUser} from "./UserThunk.ts";

export interface userState {
    user:User[]
    loading:boolean;
    error:boolean;
}


export const initialState:userState = {
    user:[],
    loading:false,
    error:false,
}

export const UserSlice = createSlice<userState>({
    name:"user",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(createUser.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(createUser.fulfilled,(state) => {
            state.loading = false;
        });
        builder.addCase(createUser.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });

        builder.addCase(saveUser.pending,(state) => {
            state.loading = true;
            state.error = false;
        });
        builder.addCase(saveUser.fulfilled,(state) => {
            state.loading = false;
        });
        builder.addCase(saveUser.rejected,(state) => {
            state.loading = false;
            state.error = true;
        });


    }
});

export const UserReducer = UserSlice.reducer;
export const loadingUserState = (state: RootState) => state.user.loading;
export const userState = (state: RootState) => state.user.user;
