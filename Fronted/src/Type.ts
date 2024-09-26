export interface Artist {
    id: string;
    name: string;
    description: string;
    image: string | null;

}

export type ArtistMutation = {
    name: string;
    description: string;
    image: string | null;
}

export interface Album {
    id: string;
    title: string;
    YearOfProduction: string;
    artist:string
    image: string | null;

}

export type AlbumMutation = {
    title: string;
    YearOfProduction: string;
    artist:string
    image: string | null;
}

export interface Track {
    id:string;
    name:string;
    length: string;
    album:string;
}

export interface TrackMutation {
    name:string;
    length: string;
    album:string;
}

export interface User {
    _id:string
    username:string;
    token: string;
    role: string;
}

export interface UserMutation {
    username:string;
    password:string
}

