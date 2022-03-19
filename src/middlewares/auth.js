const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // const token = authHeader && authHeader.split(' ')[1];
    const token = req.cookies.accessToken;

    if (!token) return res.send('ko có token');
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.phonenumber = decoded.phonenumber;
        next();
    } catch (error) {
        console.log(error);
        return res.send('You are not authorized');
    }
}

module.exports = verifyToken