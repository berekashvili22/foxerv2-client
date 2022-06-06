import React from 'react';

import { useModal } from '../../../common/hooks/useModal';

import { strings } from '../staticData';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

import GoogleAuthButton from '../components/GoogleAuthButton';

import { XIcon } from '@heroicons/react/outline';

const views = {
    login: 'login',
    register: 'register'
};

const AuthModalView = () => {
    // Get useModal hook to close modal
    const { toggleModalState } = useModal();

    // State for active view (login or register)
    const [activeView, setActiveView] = React.useState(views.login);

    /**
     * Sets active view
     */
    const toggleView = () =>
        setActiveView(activeView === views.login ? views.register : views.login);

    return (
        <div className="h-full w-full fixed bg-black z-40 bg-opacity-60 d-flex justify-end">
            <div className="h-full w-96 bg-white px-5 d-flex flex-col rounded overflow-y-scroll pb-20">
                <div className="w-full h-9 d-flex items-center justify-center relative mt-5 mb-10">
                    <XIcon
                        className="w-5 h-5 absolute left-0 cursor-pointer"
                        onClick={() => toggleModalState('authModalIsOpen', false)}
                    />
                    <h2 className="cursor-pointers text-xl font-bold">
                        {strings[activeView].mainTitle}
                    </h2>
                </div>
                {/*Auth Form */}
                {activeView === views.login ? <LoginForm /> : <RegisterForm />}
                {/*  */}
                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-300 border-solid" />
                    <span className="flex-shrink mx-4 text-gray-4s00">{strings.or}</span>
                    <div className="flex-grow border-t border-gray-300 border-solid" />
                </div>
                <GoogleAuthButton />
                <p className="mt-3 mb-6 text-xs text-gray-500">{strings.promotionText}</p>
                <button
                    className={`border-solid border py-2 border-indigo-500  text-indigo-500 rounded text-base font-bold  hover:bg-slate-50 ease-out duration-300`}
                    onClick={toggleView}>
                    <p>{strings[activeView].solutionText}</p>
                </button>
            </div>
        </div>
    );
};

export default AuthModalView;
