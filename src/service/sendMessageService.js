import { response } from 'express';
import nodemailer from 'nodemailer';
// import {google} from 'googleapis';
import googleapis from "googleapis";
const { google } = googleapis;

const CLIENT_ID = '42677946740-8vqn120tk97561l8ajv9ilkgkab7jcuh.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';   
const REFRESH_TOKEN = '1//041tNiXq-aiGPCgYIARAAGAQSNwF-L9Ir24-tPCt51kEhmt70iFVl6InxaOLapn5hfpTBrAw-Ua-5f6VqwREHstcFo4SEZE8a1g0';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

async function sendMail(user) {
    try{
        console.log(user + "------------------------------");
        const accessToken = await oAuth2Client.getAccessToken()

        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                type: 'OAuth2',
                user: "llceverbestlab@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const details = {
            from: "llceverbestlab@gmail.com",
            to: 'bobur@everbestlab.com',
            subject: "Name: " + user.yourName + "\n Email: " + user.email,
            text: user.text
        }
        const result = await mailTransporter.sendMail(details)
        console.log(result);
    } catch(error){
        return error;
    }
}
 

export const sendMessageService = (user, res) => {

    sendMail(user.body)
        .then((result) => {
            console.log('Email sent...', result)
            res.send("Yuborildi");
        })
        .catch((error) => {
            res.send("Yuborilmadi");
            console.log(error.message);
        });
    
    
}
