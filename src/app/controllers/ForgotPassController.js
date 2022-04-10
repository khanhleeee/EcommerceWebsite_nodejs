const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// [GET] /forgotPass
const showForgot = async(req, res, next) => {
    res.render('TabLogin/forgotPass', { layout: 'mainClient.hbs' });
}

//[POST] /forgotPass/recoverPass
const recoverPass = async(req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        req.session.message = {
            type: 'danger',
            intro: 'Email không tồn tại !',
        }
        return res.redirect('/forgotPass');
    };

    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
        email: user.email,
        id: user.id,
    }
    const token = jwt.sign(payload, secret, { expiresIn: '15m' });
    const link = `http://localhost:3000/forgotPass/resetPass/${user.id}/${token}`;
    const emailCus = `${user.email}`;

    try {
        const output = `
        <body style="background-color: #59ab6e;">
    <!-- start preheader -->
    <div class="preheader"
        style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #40de65; opacity: 0;">
        The request for reseting password from KCT Customer Service
    </div>
    <!-- end preheader -->
    <!-- start body -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <!-- start logo -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 20px 24px;">
                            <h3 style="color: #59ab6e;
      font-weight: 300;
      font-size: 50px;
      line-height: 0.65;
      font-family: 'Lobster', cursive; margin-bottom: -10px">
                                KCT
                            </h3>
                            <p style="font-size: 14px;
      text-algin: center;
      color: #545454;
      font-weight: 400;
      text-transform: capitalize;
      font-style: italic;
      font-family: 'Mansalva', cursive;">specializes in jewelry accessories</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- end logo -->

        <!-- start hero -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                            <h1
                                style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                                Reset Your Password</h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <!-- end hero -->
        <!-- start copy block -->
        <tr>
            <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't
                                reset your password, you can safely delete this email.</p>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start button -->
                    <tr>
                        <td align="left" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                                                    <a href="${link}" target="_blank"
                                                        style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Do
                                                        Something Sweet</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- end button -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your
                                browser:</p>
                            <p style="margin: 0;"><a href="${link}" target="_blank">http://localhost:3000/forgotPass</a>
                            </p>
                        </td>
                    </tr>
                    <!-- end copy -->
                    <!-- start copy -->
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 20px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                            <p style="margin: 0;">Best regard,<br> KCT Customer Service</p>
                        </td>
                    </tr>
                    <!-- end copy -->
                </table>
            </td>
        </tr>
        <!-- end copy block -->
        <!-- start footer -->
        <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 20px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <!-- start permission -->
                    <tr>
                        <td align="center" bgcolor="#e9ecef"
                            style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">You received this email because we received a request for reseting for
                                your account. If you didn't request it you can safely delete this email.</p>
                            <p style="margin: 0;">Su Van Hanh street, district 10, Ho Chi Minh city</p>
                        </td>
                    </tr>
                    <!-- end permission -->
                </table>
            </td>
        </tr>
        <!-- end footer -->

    </table>
    <!-- end body -->

</body>
        `;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.kctshop.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'kctshop.cs@gmail.com', // generated ethereal user
                pass: 'bin23082001' // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"KCT Shop Service" <kctshop.cs@gmail.com>', // sender address
            to: emailCus, // list of receivers
            subject: 'Confirm Reset Password', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            req.session.message = {
                type: 'success',
                intro: 'Kiểm tra email của bạn !',
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.redirect('/login');
        });
        // res.redirect('/forgotPass');
        console.log(link)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

//[GET] /forgotPass/resetPass/:id/:token
const resetPass = async(req, res, next) => {
    const { id, token } = req.params;
    const user = await User.findOne({ _id: id });
    if (id !== user.id) {
        req.session.message = {
            type: 'danger',
            intro: 'User not found !',
        }
        return res.redirect('/forgotPass');
    }

    const secret = process.env.JWT_SECRET + user.password;
    try {
        const payload = jwt.verify(token, secret);
        res.render('TabLogin/resetPass', { layout: 'mainClient.hbs', emai: user.email });
    } catch (error) {
        console.log(error.message)
            // Sửa giao diện ở đây tí
        res.send(error.message)
    }
}

//[POST] /forgotPass/resetPass/:id/:token
const reset = async(req, res, next) => {
    const { id, token } = req.params;
    const { password, passwordConf } = req.body;

    const user = await User.findOne({ _id: id });
    const secret = process.env.JWT_SECRET + user.password;
    try {
        const payload = jwt.verify(token, secret);
        if (password !== passwordConf) {
            req.session.message = {
                type: 'danger',
                intro: 'Password not match !',
            }
            return res.redirect('/forgotPass');
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await User.findOneAndUpdate({ _id: id }, { password: hashPassword });
        req.session.message = {
            type: 'success',
            intro: 'Reset password thành công !',
        }
        return res.redirect('/login');
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}
module.exports = { showForgot, recoverPass, resetPass, reset }