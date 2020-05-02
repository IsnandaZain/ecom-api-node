import nodemailer from 'nodemailer';

import db from '../../config/sequelize_master';

const User = db.User;
const VerifyEmailToken = db.VerifyEmailToken;

const sendEmailVerification = async(user_id) => {
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
    User.findOne({
        where: {
            id: user_id
        }, include: [{
            model: VerifyEmailToken,
            as: 'verify_email'
        }]
    }).then( (user) => {
        let mailOptions = {
            from: process.env.AUTH_EMAIL_USER,
            to: user.email,
            subject: 'Account Verification',
            text: 'to verify your account please click this link : http://127.0.0.1/api/v1/auth/verify-email/' + user.verify_email.url,
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent : ' + info.response);
            }
        });
    }).catch( error => console.log(error));
        
};

export default {
    sendEmailVerification
};