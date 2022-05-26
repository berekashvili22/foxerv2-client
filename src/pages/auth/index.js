import React from 'react';

import LoginView from '../../modules/auth/views/LoginView';
import RegisterView from '../../modules/auth/views/RegisterView';

import GoogleAuthButton from '../../modules/auth/components/GoogleAuthButton';

import { useGoBack } from '../../common/hooks/useGoBack';
// Later this will come from db
import { formData, strings } from '../../modules/auth/staticData';

const Auth = () => {
    const views = {
        login: 'login',
        register: 'register'
    };

    const { goBack } = useGoBack();

    // State for active view (login or register)
    const [activeView, setActiveView] = React.useState(views.login);

    /**
     * Sets active view
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
                <div className={`auth-form-wrapper ${activeView}-wrapper`}>
                    <h1 className={`auth-form-title ${activeView}-title`}>
                        {strings[activeView].mainTitle}
                    </h1>
                    {activeView === views.login ? (
                        <LoginView formData={formData.login} strings={strings} />
                    ) : (
                        <RegisterView formData={formData.register} strings={strings} />
                    )}
                    {activeView === views.login && (
                        <p className="auth-text-muted auth-form-forgot-password">
                            {strings.forgotPassword}
                        </p>
                    )}
                    <p className={`auth-form-bottom-text ${activeView}-bottom-text`}>
                        {strings.or}
                    </p>
                    <GoogleAuthButton />
                    <p className="auth-does-not-have-account">
                        {strings[activeView].questionText}
                        <span onClick={setView}>{strings[activeView].solutionText}</span>
                    </p>
                </div>
                <div className="auth-image-wrapper login-image-wrapper">
                    <img
                        className="auth-image login-image"
                        src={`/images/login-image.svg`}
                        alt="login"
                    />
                </div>
                <div className="auth-form-circle" />
            </React.Fragment>
        </div>
    );
};

export default Auth;
