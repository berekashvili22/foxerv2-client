import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useAuthRedirect } from '../common/hooks/useAuthRedirect';
import { removeUser } from '../store/features/user/userSlice';

const Me = () => {
    const { user } = useSelector((store) => store.user);
    const { redirectToAuth } = useAuthRedirect();

    if (!user) {
        redirectToAuth();
    }

    const dispatch = useDispatch();
    const [serverUser, setServerUser] = React.useState(null);

    React.useEffect(() => {
        handleServerUser();
    }, [user]);

    function logOutUser() {
        localStorage.setItem('user', null);
        dispatch(removeUser(null));
    }

    async function handleServerUser() {
        try {
            const res = await fetch('http://localhost:5000/api/v1/auth/me', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user?.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            console.log('🚀 ~ file: me.js ~ line 31 ~ handleServerUser ~ data', data);
            if (res.status !== 200) {
                setServerUser(null);
                return;
            }
            setServerUser(data);
        } catch (e) {
            setServerUser(null);
        }
    }
    return (
        <>
            <button onClick={logOutUser}>test logout</button>
            <div>{user ? <h1>welcome {user?.email} u are authorized</h1> : <h1>Please log in first</h1>}</div>
            <div>
                {serverUser ? (
                    <h1>welcome {serverUser.email} u are authorized on server as well</h1>
                ) : (
                    <h1>Server refused your token</h1>
                )}
            </div>
        </>
    );
};

export default Me;
