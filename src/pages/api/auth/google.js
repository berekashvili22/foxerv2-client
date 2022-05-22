export default async function handleGoogleRedirect(req, res) {
    const resp = await fetch('http://localhost:5000/api/v1/auth/googleAuth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: req.body.credential, clientId: req.body.clientId })
    });
    const data = await resp.json();
    console.log(data);
    res.redirect(307, '/auth');
}
