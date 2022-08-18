const nodemailer = require("nodemailer");
const subscriberSchema = require("../database/models/SubscriberModel");

const sendNewMail = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.ACCOUNT_MAIL,
      pass: process.env.ACCOUNT_MAIL_PASSWORD,
    },
  });

  const nodemailerResponses = []
  const subscribers = await subscriberSchema.find({ is_disabled: false });
  const attachments = [
    {
      filename: "nyan cat ✔.gif",
      path: "/Users/alejandrodelmoral/Documents/stori-challenge-server/src/assets/nyan.gif",
      cid: "nyan@example.com",
    }
  ]
  if(  req.file && req.file["buffer"]){
      attachments.push({
        filename: req.file["originalname"],
        content: req.file["buffer"],
        cid: req.file["originalname"],
      } )
    }
  subscribers.forEach((sub) => {
    const message = {
      from: "Almalevisol <almalevisol@gmail.com>",
      to: sub["email"],
      subject: "New mail to you", 
      text: "Hello to myself!",
      html:
        req.body.htmlContent !== "" && req.body.htmlContent !== "null"
          ? req.body.htmlContent.replace("${name}", "Hola" + sub["name"]) +
            `<br /> <a href="http://localhost:3000/unsubscribe?id=${sub["hash"]}" target="_blank" >Please unsubscribe me!</a>`
          : `<br /> <a href="http://localhost:3000/unsubscribe?id=${sub["hash"]}" target="_blank" >Please unsubscribe me!</a>`,
      attachments
    };
    transporter.sendMail(message, (error, result) => {
      if( error ){
        console.log("Mail NOT delivered")
      }else{
        console.log("Mail delivered")
      }
    });
  })
};

module.exports = {
  sendNewMail,
};
