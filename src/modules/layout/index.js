import React from 'react';
import Head from 'next/head';
import Header from './components/header';
import Footer from './components/footer';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setUser } from '../../store/features/user/userSlice';

const Layout = ({ children }) => {
    const { message, type } = useSelector((store) => store.message);

    return (
        <React.Fragment>
            <Head>
                <link
                    rel="stylesheet"
                    href="//cdn.web-fonts.ge/fonts/bpg-algeti/css/bpg-algeti.min.css"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=1"
                />
            </Head>
            <Header />

            {message && (
                <div className={`modal-message-container-${type ? 'success' : 'fail'} `}>
                    <div>
                        <p>{message}</p>
                    </div>
                </div>
            )}

            {/* <div className="content" style={{ width: '80vw', margin: 'auto' }}> */}
            {children}
            {/* </div> */}
            {/* <Footer /> */}
        </React.Fragment>
    );
};

export default Layout;
