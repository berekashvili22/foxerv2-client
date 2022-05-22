import React from 'react';
import { useRouter } from 'next/router';
import { clientConfig } from '../../../../../client-config';

const Header = () => {
    const router = useRouter();

    function redirectToAuth() {
        router?.push('/auth');
    }

    function renderHeader() {
        return clientConfig.headerLessRoutes.indexOf(router?.route) < 0;
    }

    return (
        <React.Fragment>
            {renderHeader() && (
                <header className="header">
                    <section className="header_top-menu_wrapper">
                        <div className="header_top-menu"></div>
                    </section>
                    <section className="header_main-menu">
                        {/* <div className="header_main-menu"> */}
                        <div className="logo_wrapper" onClick={() => router.push('/')}>
                            <h2>
                                <span>Fox</span>er
                            </h2>
                        </div>
                        <ul className="header_main-menu_items-wrapper">
                            <li>
                                <a className="hot-span">SALE</a>
                            </li>
                            <li>
                                <a>კატალოგი</a>
                            </li>
                            <li>
                                <a>ახალი</a>
                            </li>
                            <li>
                                <a>მაღაზიები</a>
                            </li>
                            <li>
                                <a>დახმარება</a>
                            </li>
                        </ul>
                        <div className="header_user-menu_wrapper">
                            <div className="user-menu_icon_wrapper heart-icon">
                                <img src={'/icons/heart-icon.svg'} />
                            </div>
                            <div className="user-menu_icon_wrapper cart-icon">
                                <img src={'/icons/cart-icon.svg'} />
                            </div>
                            <div
                                className="user-menu_icon_wrapper user-icon"
                                onClick={redirectToAuth}
                            >
                                <img src={'/icons/user-icon.svg'} />
                            </div>
                        </div>
                        {/* </div> */}
                    </section>
                </header>
            )}
        </React.Fragment>
    );
};

export default Header;
