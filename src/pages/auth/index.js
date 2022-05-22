import React from 'react';

import LoginView from '../../modules/auth/views/LoginView';
import RegisterView from '../../modules/auth/views/RegisterView';

import GoogleAuthButton from '../../modules/auth/components/GoogleAuthButton';

import { useGoBack } from '../../common/hooks/useGoBack';

const Auth = () => {
    const views = {
        login: 'login',
        register: 'register'
    };

    const { goBack } = useGoBack();

    const [activeView, setActiveView] = React.useState(views.login);

    /**
     * Set active view state
     */
    const setView = () =>
        activeView === views.login ? setActiveView(views.register) : setActiveView(views.login);

    return (
        <div className="auth-view-wrapper">
            <React.Fragment>
                <img
                    className="auth-go-back-btn"
                    src="/icons/go-back-left-arrow.svg"
                    alt="Go back"
                    onClick={goBack}
                />
                <div className="auth-form-wrapper login-wrapper">
                    <h1 className="auth-form-title login-title">
                        {activeView === views.login ? 'ავტორიზაცია' : 'რეგისტრაცია'}
                    </h1>
                    {activeView === views.login ? <LoginView /> : <RegisterView />}
                    {activeView === views.login && (
                        <>
                            <p className="auth-text-muted auth-form-forgot-password">
                                დაგვიწყდა პაროლი?
                            </p>
                        </>
                    )}
                    <p className="auth-form-bottom-text">ან</p>
                    <GoogleAuthButton />
                    <p className="auth-does-not-have-account">
                        {activeView === views.login ? 'ახალი ხარ? ' : 'უკვე დარეგისტრირდი ?'}
                        <span onClick={setView}>
                            {activeView === views.login ? 'რეგისტრაცია' : 'შესვლა'}
                        </span>{' '}
                    </p>
                </div>
                <div className="auth-image-wrapper login-image-wrapper">
                    <img
                        className="auth-image login-image"
                        src={`/images/${activeView === views.login ? 'login' : 'auth'}-image.svg`}
                        alt="login"
                    />
                </div>
                <div className="auth-form-circle" />
            </React.Fragment>
        </div>
    );
};

export default Auth;
