const LocalStrategy = require('passport-local').Strategy;
const passportFB = require('passport-facebook');
const customLogin = require('passport-custom');
const bcrypt = require('bcryptjs');
const User = require('../app/models/User');

module.exports = function(passport) {
    passport.use('custom', new customLogin(
        function(req, done) {
            User.findOne({ email: req.body.email })
                .then(user => {
                    if (!user) {
                        req.session.message = {
                            type: 'danger',
                            intro: 'Email không tồn tại !',
                        }
                        return done(null, false);
                    }

                    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            // if (user.role == 'admin') return res.redirect('/admin')
                            //     // return res.send(`User ${user.name} has logged in`);
                            // return res.render('TabCustomer/cusPage', { layout: 'mainClient.hbs' });
                            return done(null, user);
                        } else {
                            req.session.message = {
                                type: 'danger',
                                intro: 'Mật khẩu không đúng !',
                            }
                            return done(null, false);
                        }
                    });
                })
                .catch(err => console.log(err));
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new passportFB({
            clientID: 'process.env.clientID',
            clientSecret: 'process.env.clientSecret',
            callbackURL: 'http://localhost:3000/loginFB/successFB',
            profileFields: ['email', 'gender', 'locale', 'displayName'],
        },
        (accessToken, refeshToken, profile, done) => {
            console.log(profile);
            User.findOne({ id: profile._json.id }, (err, user) => {
                if (err) return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    const newUser = new User({
                        id: profile._json.id,
                        name: profile._json.name,
                        email: profile._json.email,
                        password: profile._json.id,
                        role: 'customer',
                    });
                    const user = newUser.save()
                        .save((err) => {
                            if (err) throw err;
                            return done(null, newUser);
                        });
                    console.log(user);
                }
            })
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    })
}