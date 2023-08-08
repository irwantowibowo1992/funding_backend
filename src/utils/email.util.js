const nodemailer = require('nodemailer')
class Email {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  sendEmail (data) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html
    }

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })
  }
}

module.exports = new Email()
