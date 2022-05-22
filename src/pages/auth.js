import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser } from '../store/features/user/userSlice';
import GoogleAuthButton from '../modules/auth/components/GoogleAuthButton';
import LoginView from '../modules/auth/views/LoginView';
import { useMessage } from '../common/hooks/useMessage';

const initialFormData = { email: '', password: '' };
const initialErrorsState = { email: '', password: '' };

const views = {
    login: 'login',
    register: 'register'
};

const Auth = () => {
    const { setModalMessage } = useMessage();
    const [activeView, setActiveView] = React.useState(views.login);

    const setView = (view) => setActiveView(view);

    return (
        <div className="auth-view-wrapper">
            {activeView === views.login ? <LoginView setView={setView} setModalMessage={setModalMessage} /> : 'not yet'}
        </div>
    );
};

export default Auth;
