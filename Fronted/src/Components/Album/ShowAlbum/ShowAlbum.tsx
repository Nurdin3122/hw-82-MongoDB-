import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {albumsState, loadingAlbumState} from "../AlbumSlice.ts";
import {fetchAlbums} from "../AlbumThunk.ts";
import Spinner from "../../Spinner/Spinner.tsx";

const ShowAlbum = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(albumsState);
    const loading = useAppSelector(loadingAlbumState);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div>
            <h5>Albums</h5>
            {loading ? (
                <Spinner />
            ) : (
                albums.map(album => (
                    <div key={album._id} className="border mt-3 mt-3">
                        <p className="mt-2">Name: {album.title}</p>
                        <p>year of production: {album.YearOfProduction}</p>
                    </div>
                ))
            )}

        </div>
    );
};

export default ShowAlbum;