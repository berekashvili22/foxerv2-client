import React from 'react';

const GoogleAuthButton = () => {
    /**
     * Initialize google client and render google sign in button
     */
    const initGoogleAuth = async () => {
        try {
            // Init client
            await window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                ux_mode: 'redirect',
                login_uri:
                    process.env.NEXT_PUBLIC_CLIENT_URL + process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
            });
            // Render button
            google.accounts.id.renderButton(document.getElementById('g-sign-in'), {
                type: 'standard',
                theme: 'outline',
                size: 'large',
                text: 'signup_with',
                width: '300px',
                shape: 'rectangular'
            });
        } catch (e) {
            console.log('🚀 ~ file: GoogleAuthButton.jsx ~ line 20 ~ initGoogleAuth ~ e', e);
        }
    };

    React.useEffect(() => {
        initGoogleAuth();
    }, []);

    return <div id="g-sign-in" />;
};

export default GoogleAuthButton;
