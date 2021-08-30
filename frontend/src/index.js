import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";

ReactDOM.render((
    <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>),
    document.getElementById('root')
);

