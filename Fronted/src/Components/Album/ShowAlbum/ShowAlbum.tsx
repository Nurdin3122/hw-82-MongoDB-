import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {albumsState, loadingAlbumState} from "../AlbumSlice.ts";
import {fetchAlbums} from "../AlbumThunk.ts";
import Spinner from "../../Spinner/Spinner.tsx";
import AlbumItem from "./AlbumItem.tsx";

const ShowAlbum = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(albumsState);
    const loading = useAppSelector(loadingAlbumState);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    return (
        <div>
            <h5 className="mt-5 text-center ">Albums</h5>
            <div className="d-flex flex-wrap">
            {loading ? (
                <Spinner />
            ) : (
                albums.map(album => (
                   <AlbumItem key={album._id}
                              id={album._id}
                              image={album.image}
                              title={album.title}
                              YearOfProduction={album.YearOfProduction}
                   />
                ))
            )}
            </div>
        </div>
    );
};

export default ShowAlbum;