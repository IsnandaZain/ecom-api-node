import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import "core-js/stable";
import "regenerator-runtime";

import db from '../../config/sequelize_master';

const User = db.User;
const VerifyEmailToken = db.VerifyEmailToken;

const sendEmailVerification = async(user_id) => {
    let transporter = nodemailer.createTransport(sendgridTransport({
        auth: {
            api_key: process.env.API_KEY_SENDGRID
        }
    }));

    // get user
    User.findOne({
        where: {
            id: user_id
        }, include: [{
            model: VerifyEmailToken,
            as: 'verify_email',
            order: [
                ['id', 'desc']
            ]
        }]
    }).then( (user) => {
        let mailOptions = {
            from: process.env.AUTH_EMAIL_USER,
            to: user.email,
            subject: 'Account Verification',
            text: 'to verify your account please click this link : http://127.0.0.1/api/v1/auth/verify-email/' + user.verify_email[0].url,
        };
        
         
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent to : ', mailOptions.text);
            }
        });
        
    }).catch( error => console.log(error));
        
};

export default {
    sendEmailVerification
};