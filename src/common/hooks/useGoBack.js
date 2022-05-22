import { useRouter } from 'next/router';

export const useGoBack = () => {
    const router = useRouter();

    /**
     * Go back to prevPath or home
     */
    function goBack() {
        let path = '/';
        try {
            const prevPath = JSON.parse(localStorage.getItem('prevPath'));
            if (prevPath) path = prevPath;
        } catch (e) {
            console.log(e);
        } finally {
            router?.push(path);
        }
    }

    return { goBack };
};
