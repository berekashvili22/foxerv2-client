import { useRouter } from 'next/router';
import { sendErrorLog } from '../lib/errorLogger';
import { useLocalStorageWithTTL } from './useLocalStorageWithTTL';

export const useAuthRedirect = () => {
    const router = useRouter();

    const { setLocalStorageItemWithTTL } = useLocalStorageWithTTL();

    function redirectToAuth() {
        const ISSERVER = typeof window === 'undefined';

        if (ISSERVER) return;

        try {
            setLocalStorageItemWithTTL('nextPage', router?.asPath, 5 * 60);
        } catch (e) {
            sendErrorLog('useAuthRedirect.js : ' + e);
        } finally {
            router.push('/auth');
        }
    }

    return { redirectToAuth };
};
