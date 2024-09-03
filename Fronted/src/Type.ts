export interface Artist {
    id: string;
    name: string;
    description: string;

}

export type ArtistMutation = {
    name: string;
    description: string;

}