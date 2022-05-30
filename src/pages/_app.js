import React from 'react';
import { Provider } from 'react-redux';

import '../../styles/css/main.css';
import '../../styles/global.css';
import '../../styles/index.css';

import Layout from '../modules/layout';
import { store } from '../store/store';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <script src="https://accounts.google.com/gsi/client" async defer />
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </>
    );
}

export default MyApp;
