import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {ArtistReducer} from "../Components/Artist/ArtistSlice.ts";
import {AlbumReducer} from "../Components/Album/AlbumSlice.ts";
import {TrackReducer} from "../Components/Track/TrackSlice.ts";
import {UserReducer} from "../Components/User/UserSlice.ts";
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist";


const usersPersistConfig = {
    key: 'music:user',
    storage,
    whitelist: ['user'],
};
const rootReducer = combineReducers({
    artist:ArtistReducer,
    album:AlbumReducer,
    track:TrackReducer,
    user: persistReducer(usersPersistConfig, UserReducer),
});

export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;