import React from 'react';
import imageNotAvailable from '../../../assets/images/imageNotAvailab.jpg';
import {apiURL} from "../../../BaseUrl.ts";

interface Props {
    id:string;
    title:string;
    image:string
    YearOfProduction:string;
}

const AlbumItem:React.FC<Props> = ({id,title,image,YearOfProduction}) => {
    let cardImage = imageNotAvailable
    if (image) {
        cardImage = apiURL + "/images" + "/" + image;
    }
    return (
        <div key={id} className="item-artist border me-auto ms-auto mt-4 mb-4 d-flex flex-column align-items-center">
            <div className="body d-flex align-items-center flex-column">
                <div className="image-card">
                    <img className="img-artist" src={`${cardImage}`} alt={`${title}`}/>
                </div>
                <p className="mt-2">{title}</p>
                <p>{YearOfProduction}</p>
            </div>
        </div>
    );
};

export default AlbumItem;