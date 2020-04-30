import nodemailer from 'nodemailer';
import moment from 'moment';

import db from '../../config/sequelize_master';

const User = db.User;

const sendEmailVerification = async(email) => {
    console.log("auth email : ", process.env.AUTH_EMAIL_USER);
    console.log("auth password : ", process.env.AUTH_EMAIL_PASSWORD);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.AUTH_EMAIL_USER,
            pass: process.env.AUTH_EMAIL_PASSWORD,
        }
    });

    

    // get user
    User.getByEmail(email).then( (user) => {
        let mailOptions = {
            from: process.env.AUTH_EMAIL_USER,
            to: email,
            subject: 'Account Verification',
            text: 'to verify your account please click this link : http://127.0.0.1/api/v1/auth/verify-token/' + user.verify_token,
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent : ' + info.response);
            }
        });
    }).catch( error => next(error));
        
};

export default {
    sendEmailVerification
};