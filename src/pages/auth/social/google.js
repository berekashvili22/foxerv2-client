import React from 'react';
import { useRouter } from 'next/router';

import { clientConfig } from '../../../../client-config';

import { setUser } from '../../../store/features/user/userSlice';

import { useDispatch } from 'react-redux';
import { useLocalStorageWithTTL } from '../../../common/hooks/useLocalStorageWithTTL';
import { useMessage } from '../../../common/hooks/useMessage';

import { messages } from '../../../common/utils/messages';
import { sleep } from '../../../common/utils/helpers';
import { sendErrorLog } from '../../../common/lib/errorLogger';

import TailSpinner from '../../../common/components/spinners/TailSpinner';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { getLocalStorageItemWithTTL } = useLocalStorageWithTTL();

    const { setModalMessage } = useMessage();

    React.useEffect(() => {
        let timer = setTimeout(async () => {
            setModalMessage(messages.unexpected, 2000, false);
            await sleep(2000);
            router.push('/auth');
        }, 10000);

        const { token, clientId } = router.query;
        if ((token, clientId)) {
            handleGoogleLogin(token, clientId);
        }

        // this will clear Timeout
        return () => {
            clearTimeout(timer);
        };
    }, [router.query]);

    async function handleGoogleLogin(token, clientId) {
        try {
            const res = await fetch(`${clientConfig.serverURL}/auth/googleAuth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, clientId })
            });

            const { user, msg } = await res.json();

            if (res.status === 200) {
                // Set user data to local storage
                localStorage.setItem('user', JSON.stringify(user));
                // Set user data to store
                dispatch(setUser(user));
                setModalMessage(msg, 2000, true);
                await sleep(2000);

                // Get next page route
                const nextPage = getLocalStorageItemWithTTL(clientConfig.NEXT_PAGE_KEY);

                // Clear local storage nextPage
                localStorage.removeItem(clientConfig.NEXT_PAGE_KEY);

                // Redirect to next page
                router.push(nextPage || clientConfig.HOME_ROUTE);
            } else {
                setModalMessage(msg || messages.unexpected, 3000, false);
                // sendErrorLog(`${msg || messages.unexpected}`);
                router.push('/auth');
            }
        } catch (e) {
            sendErrorLog('google.js, handleGoogleLogin : ' + e);
            setModalMessage(messages.unexpected, 4000, false);
            router.push('/auth');
        }
    }

    return (
        <div className="google-auth-wrapper">
            <TailSpinner width={20} height={20} color={'black'} />
        </div>
    );
};

export default GoogleAuth;
