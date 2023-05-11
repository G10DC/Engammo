const nodemailer = require("nodemailer");
const GPT = require("./GPT_interaction");
require("dotenv").config();

async function sendEmail(mittente, destinatario, argomento) {
  try {
    const account = await nodemailer.createTestAccount();

    console.log("Credentials obtained, sending message...");

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const newPrompt = `You are a customer service AI assistant and your task is to generate a professional and concise email for a customer whose details are stored in the JSON object ${JSON.stringify(
      destinatario
    )}. 
     The email should be based on the argument <${argomento}> and tailored to the customer's needs. 
     Avoid repetition of concepts or the same sequence of words.
     The JSON object contains the customer's name and surname, as well as other keywords related to their details that you can use to personalize the email without explicitly refer to them. 
     Sign the email as <${mittente}>.
     Please return a JSON object with the following keys: "recipient", "sender", "subject", and "content". 
     Ensure that there is no punctuation around the object and leave a space after the newline character.`;
    const preMail = await GPT.queryToGpt(newPrompt);
    const Mail = JSON.parse(preMail);

    const message = {
      from: `Sender Name <${account.user}>`,
      to: `Recipient <${destinatario.email}>`,
      subject: Mail.subject,
      text: Mail.content,
    };

    const info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("Error occurred. " + error.message);
  }
}

module.exports = { sendEmail };
