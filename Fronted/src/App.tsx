import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./Container/Header.tsx";
import Home from "./Container/Home.tsx";
import Artists from "./Components/Artist/Artists.tsx";
import ShowArtists from "./Components/Artist/ShowArtists/showArtists.tsx";
import AlbumForm from "./Components/Album/AlbumFrom/AlbumForm.tsx";
import ShowAlbum from "./Components/Album/ShowAlbum/ShowAlbum.tsx";
import TrackForm from "./Components/Track/TrackFrom/TrackForm.tsx";
import ShowTracks from "./Components/Track/ShowTracks/ShowTracks.tsx";
import CreateUser from "./Components/User/CreateUser/CreateUser.tsx";
import SaveUser from "./Components/User/SaveUse/SaveUser.tsx";

const App = () => {

    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/createArtists" element={<Artists/>}/>
                    <Route path="/showArtists" element={<ShowArtists/>}/>

                    <Route path="/AlbumForm" element={<AlbumForm/>}/>
                    <Route path="/ShowAlbum" element={<ShowAlbum/>}/>

                    <Route path="/TrackForm" element={<TrackForm/>}/>
                    <Route path="/ShowTracks" element={<ShowTracks/>}/>

                    <Route path="/CreateUser" element={<CreateUser/>}/>
                    <Route path="/SaveUser" element={<SaveUser/>}/>

                    <Route path="*" element={<h3>There is not such page!</h3>}/>
                </Routes>
            </main>
        </>
    )};





export default App
