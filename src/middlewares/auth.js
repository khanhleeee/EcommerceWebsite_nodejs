const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // const authHeader = req.header('Authorization');

    // const token = authHeader && authHeader.split(' ')[1];

    //GET Authorization from Header browser
    const token = req.cookies.Authorization;
    console.log(token);

    if (!token) return res.send('ko có token');
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        // req.phonenumber = decoded.phonenumber;
        next();
    } catch (error) {
        return res.send('You are not authorized');
        console.log(error);
    }
}

module.exports = verifyToken