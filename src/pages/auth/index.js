import React from 'react';
import dynamic from 'next/dynamic';

const RegisterView = dynamic(() => import('../../modules/auth/views/RegisterView'));

import LoginView from '../../modules/auth/views/LoginView';

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
        <React.Fragment>
            <div className="relative justify-center w-full h-screen bg-gray d-flex">
                <img
                    className="absolute w-8 h-8 cursor-pointer left-5 top-5"
                    src="/icons/go-back-left-arrow.svg"
                    alt="Go back"
                    onClick={goBack}
                />
                <div
                    className={`flex-col ${
                        activeView === views.login ? 'mt-40' : 'mt-20'
                    } border-solid d-flex align-center`}
                >
                    <h1 className="mb-10 text-4xl font-normal tracking-wide text-center text-indigo-600">
                        {strings[activeView].mainTitle}
                    </h1>
                    {activeView === views.login ? (
                        <LoginView formData={formData.login} strings={strings} />
                    ) : (
                        <RegisterView formData={formData.register} strings={strings} />
                    )}
                    <p className="mt-3 mb-3 text-center text-gray-500">{strings.or}</p>
                    <div className="justify-center mb-5 d-flex">
                        <GoogleAuthButton />
                    </div>
                    <p className="text-center">
                        {strings[activeView].questionText}
                        <span
                            className="pl-2 text-lg font-bold underline cursor-pointer"
                            onClick={setView}
                        >
                            {strings[activeView].solutionText}
                        </span>
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Auth;
