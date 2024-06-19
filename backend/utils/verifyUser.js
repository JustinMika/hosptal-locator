// middleware
const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.sendStatus(400)
    }

    jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            return res.status(404).json({
                user: user ?? 'user'
            })
        }
        req.user = user
        next()
    })
}
