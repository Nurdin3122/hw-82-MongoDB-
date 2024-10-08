import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {persistor, store} from "./store/store.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import {PersistGate} from "redux-persist/integration/react";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./BaseUrl.ts";


createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </PersistGate>
    </Provider>
    </GoogleOAuthProvider>

)
