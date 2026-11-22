import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import {EMAIL , PASSWORD} from '../config.js';


// https://ethereal.email/create
let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: EMAIL, // generated ethereal user
        pass: PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "ClubLink University",
        link: 'https://mailgen.js/',
        // Optional: you can add a logo here
        // logo: 'https://your-logo-url.png'
    }
})

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
}
*/
export const registerMail = async (req, res) => {
    const { username, userEmail } = req.body;

    // Mailgen Email Body for Registration
    let response = {
        body: {
            name: username || 'User',
            intro: [
                'Welcome to the ClubLink University System! We are very excited to have you on board.',
                'Your account has been successfully created. You can now explore university clubs, manage your memberships, and stay updated on the latest events.'
            ],
            action: {
                instructions: 'To get started, please click the button below to log into your account:',
                button: {
                    color: '#011d3f', // Keeping your original theme color
                    text: 'Login to your account',
                    link: 'http://localhost:5173/login'
                }
            },
            outro: 'If you have any questions or need assistance, feel free to reply directly to this email.'
        }
    };

    const emailBody = MailGenerator.generate(response);

    let message = {
        from : EMAIL,
        to: userEmail,
        subject : "Registration Successful",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({ error }))
}


/** POST: http://localhost:4000/api/auth/send-otp 
 * @param: {
  "userEmail" : "student@univ.ac.lk",
  "otp" : "123456"
}
*/
export const sendOTPMail = async (req, res) => {
    const { userEmail, otp } = req.body;

    // Mailgen Email Body for OTP
    let response = {
        body: {
            name: 'User',
            intro: 'We received a request to verify your account or reset your password.',
            dictionary: {
                'Verification Code': otp
            },
            outro: 'This code will expire in **5 minutes**. If you did not request this, you can safely ignore this email.'
        }
    };

    const emailBody = MailGenerator.generate(response);

    let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Password Reset OTP",
        html: emailBody
    };

    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "OTP Email sent successfully." });
        })
        .catch(error => {
            console.error("Email error:", error);
            return res.status(500).send({ error: "Failed to send email" });
        });
}