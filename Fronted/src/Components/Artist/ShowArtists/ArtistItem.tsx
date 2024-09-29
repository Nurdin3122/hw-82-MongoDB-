import React from 'react';
import "./ArtistItem.css";
import {apiURL} from "../../../BaseUrl.ts";
import imageNotAvailable from '../../../assets/images/imageNotAvailab.jpg';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {userState} from "../../User/UserSlice.ts";
import {deleteArtist, fetchArtists, isPublishedArtist} from "../ArtistThunk.ts";
import {deleteLoading, publishedLoading} from "../ArtistSlice.ts";
import Spinner from "../../Spinner/Spinner.tsx";



interface Props {
    id:string;
    image:string;
    name:string;
    description:string;
    isPublished:boolean
}

const ArtistItem:React.FC<Props> = ({id,image,name,description,isPublished}) => {
    const user = useAppSelector(userState);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const loadingDelete = useAppSelector(deleteLoading)
    const publishedLoadingArtist = useAppSelector(publishedLoading)

    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/" + image;
    }


    const onDelete = async  (id:string) => {
        await dispatch(deleteArtist(id));
        await dispatch(fetchArtists());
    };

    const ShowAlbums = (id:string) => {
        navigate(`/ShowAlbum/${id}`)
    }

    const isPublishedBtn = async (id:string) => {
        await dispatch(isPublishedArtist(id));
        await dispatch(fetchArtists());
        navigate("/")
    };

    return (
        <div key={id} className="item-artist border m-4">
            <div className="body d-flex align-items-center flex-column">
                {
                    publishedLoadingArtist ? (
                        <Spinner/>
                    ) : (
                        user && user.role === 'admin' && (
                            <button className="btn btn-close-white"
                                    onClick={() => isPublishedBtn(id)}> {isPublished ? "Published" : "Not Published"}</button>
                        )
                    )
                }
                <div className="image-card">
                    <img className="img-artist" src={`${cardImage}`} alt={`${name}`}/>
                </div>
                <p className="mt-2">{name}</p>
                <p>{description}</p>
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
                    <button className="btn btn-dark ms-2" onClick={() => ShowAlbums(id)}>
                        show albums
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtistItem;