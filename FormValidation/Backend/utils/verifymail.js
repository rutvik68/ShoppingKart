const nodemailer = require("nodemailer")
const ejs = require('ejs');


exports.mailTransport=()=>nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "68f6b9b214179e",
      pass: "765efda1d8bce1",
    }
  });

exports.generateEmail= name => {

  console.log('hi');
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  </head>
  <body>
  <p>Hey!! <b>${name}</b></p>,

<p>I'm Rutvik Kansara, the founder of Shopping Kart and I'd like to personally thank you for signing up to our service.
</P>
<p>I'd love to hear what you think of our Product and if there is anything we can improve. If you have any questions, please reply to this email. I'm always happy to help!
</p>
<p><b>
Shooping Kart</b></p></body></html>`;
}
