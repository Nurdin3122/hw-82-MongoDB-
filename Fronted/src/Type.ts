export interface Artist {
    id: string;
    name: string;
    description: string;

}

export type ArtistMutation = {
    name: string;
    description: string;
}

export interface Album {
    id: string;
    title: string;
    YearOfProduction: string;
    artist:string

}

export type AlbumMutation = {
    title: string;
    YearOfProduction: string;
    artist:string
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
    id:string
    username:string;
    password:string;
    token:string;
}

export interface UserMutation {
    username:string;
    password:string
}

