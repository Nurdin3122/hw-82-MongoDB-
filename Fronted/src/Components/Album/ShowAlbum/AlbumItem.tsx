import React from 'react';
import imageNotAvailable from '../../../assets/images/imageNotAvailab.jpg';
import {apiURL} from "../../../BaseUrl.ts";
import {useNavigate} from "react-router-dom";
import Spinner from "../../Spinner/Spinner.tsx";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {userState} from "../../User/UserSlice.ts";
import {deleteAlbum, fetchAlbums, getOneAlbum, isPublishedAlbum} from "../AlbumThunk.ts";
import {albumPublishedLoading, loadingDeleteAlbum} from "../AlbumSlice.ts";

interface Props {
    id:string;
    title:string;
    image:string
    YearOfProduction:string;
    isPublished:boolean;
    idArtist:string
}

const AlbumItem:React.FC<Props> = ({id,title,image,YearOfProduction,isPublished,idArtist}) => {
    const navigate = useNavigate();
    const user = useAppSelector(userState);
    const loadingDelete = useAppSelector(loadingDeleteAlbum)
    const publishedLoadingAlbum = useAppSelector(albumPublishedLoading)
    const dispatch = useAppDispatch()

    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/" + image;
    }

    const onDelete = async  (id:string) => {
        await dispatch(deleteAlbum(id));
        await dispatch(fetchAlbums());
        navigate(`/`)
    };

    const ShowTracks = (id:string) => {
        navigate(`/ShowTracks/${id}`)
    }

    const isPublishedBtn = async (id:string) => {
        await dispatch(isPublishedAlbum(id));
        await dispatch(getOneAlbum(idArtist));
    };



    return (
        <div key={id} className="border m-4">
            <div className="body d-flex align-items-center flex-column">
                {
                    publishedLoadingAlbum ? (
                        <Spinner/>
                    ) : (
                        user && user.role === 'admin' && (
                            <button className="btn btn-close-white"
                                    onClick={() => isPublishedBtn(id)}> {isPublished ? "Published" : "Not Published"}</button>
                        )
                    )
                }
                <div className="image-card">
                    <img className="img-artist" src={`${cardImage}`} alt={`${title}`}/>
                </div>
                <p className="mt-2">{title}</p>
                <p>{YearOfProduction}</p>
            </div>
            <div className="d-flex align-items-center">
                {
                    loadingDelete ? (
                        <Spinner/>
                    ) : (
                        user && user.role === 'admin' && (
                            <button className="btn btn-close" onClick={() => onDelete(id)}></button>
                        )
                    )
                }
                <button className="btn btn-dark ms-2" onClick={() => ShowTracks(id)}>
                    show tracks
                </button>
            </div>
        </div>
    );
};

export default AlbumItem;