import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {artistState, loadingState} from "../ArtistSlice.ts";
import Spinner from "../../Spinner/Spinner.tsx";
import {fetchArtists} from "../ArtistThunk.ts";
import ArtistItem from "./ArtistItem.tsx";

const ShowArtists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(artistState);
    const loading = useAppSelector(loadingState);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch]);



    return (
        <div>
            <h5 className="mt-5 text-center ">Artists</h5>
            <div className="d-flex flex-wrap">

                {loading ? (
                    <Spinner/>
                ) : (
                    artists.map(artist => (
                        <ArtistItem key={artist._id}
                                    id={artist._id} image={artist.image}
                                    name={artist.name}
                                    description={artist.description}
                        />
                    ))
                )}
            </div>

        </div>

    );
};

export default ShowArtists;