const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "medconnect097@gmail.com",
        pass: "cynk nuzs kohm znpo",
    },
});

async function sendVerificationEmail(toEmail, doctorName) {
    await transporter.sendMail({
        from: `"MedConnect" <YOUR_EMAIL@gmail.com>`,
        to: toEmail,
        subject: "MedConnect Account Verified ✅",
        html: `
      <h2>Hello Dr. ${doctorName},</h2>
      <p>Your MedConnect account has been <b>successfully verified</b>.</p>
      <p>You can now login and start connecting with other doctors.</p>
      <br/>
      <a href="http://localhost:5000" 
         style="padding:10px 20px;background:#0d6efd;color:#fff;text-decoration:none;border-radius:6px;">
         Login to MedConnect
      </a>
      <br/><br/>
      <p>— MedConnect Team</p>
    `,
    });
}

module.exports = sendVerificationEmail;
