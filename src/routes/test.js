const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    if (req.session.logined) {
        var va = req.session.email
        res.send(`Đăng nhập thành công ${va}`);
    } else {
        res.send(`dang nhap that bai ${va}`)
    }
});

module.exports = router;