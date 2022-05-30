import React from 'react';
import Head from 'next/head';
import Header from './components/header';
import Footer from './components/footer';
import { useSelector } from 'react-redux';
import HeaderView from '../header/views/HeaderView';
import FooterView from '../footer/views/FooterView';
import { SpeakerphoneIcon } from '@heroicons/react/outline';
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
            {/* <Header /> */}
            <HeaderView />
            {message && (
                <div
                    className={`absolute top-0 flex items-center justify-center w-full h-10 text-lg font-bold text-white ${
                        type ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                    <span className="mr-5 rounded-lg flex-0">
                        <SpeakerphoneIcon className="w-6 h-6 text-white" aria-hidden="true" />
                    </span>
                    <p>{message}</p>
                </div>
            )}
            {children}
            <FooterView />
        </React.Fragment>
    );
};

export default Layout;
