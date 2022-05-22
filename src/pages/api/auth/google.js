export default async function handleGoogleRedirect(req, res) {
    res.redirect(
        307,
        `/auth/social/google?token=${req.body.credential}&clientId=${req.body.clientId}`
    );
}
