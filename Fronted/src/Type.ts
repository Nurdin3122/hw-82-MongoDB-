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

