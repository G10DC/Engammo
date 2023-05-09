const nodemailer = require('nodemailer');
const GPT = require('./GPT_interaction');
require('dotenv').config();

async function sendEmail(mittente, destinatario, argomento) {
    try {
        const account = await nodemailer.createTestAccount();

        console.log('Credentials obtained, sending message...');

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        const oggettoMail = await GPT.queryToGpt(`scrivi l'oggetto di una mail coinciso basato su ${argomento}`);
        const contenutoMail = await GPT.queryToGpt(`scrivi il contenuto di una mail in modo colloquiale nella lingua parlata in ${destinatario.nazionalita} proveniente da ${mittente} da inviare a [${JSON.stringify(destinatario)}]. Elaborando le informazioni [${JSON.stringify(destinatario)}] cerca di rimanere focalizzato su ${argomento}, usa un linguaggio semplice per un ${destinatario.lavoro}`);

        const message = {
            from: `Sender Name <${account.user}>`,
            to: `Recipient <${destinatario.email}>`,
            subject: oggettoMail,
            text: contenutoMail
        };

        const info = await transporter.sendMail(message);

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log('Error occurred. ' + error.message);
    }
}

module.exports = { sendEmail };
