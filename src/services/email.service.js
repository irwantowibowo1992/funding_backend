const path = require('path')
const fs = require('node:fs')
const handlebars = require('handlebars')
const Email = require('../utils/email.util')

class EmailService {
  async registerOTP (name, email, otp) {
    const filePath = path.join(__dirname, '../views/email/otp.view.handlebars')
    fs.readFile(
      filePath,
      { encoding: 'utf8' },
      function (_error, data) {
        const template = handlebars.compile(data)
        const dataTemplate = {
          name,
          otp
        }
        const htmlContent = template(dataTemplate)

        const textContent = `
                    Halo ${name}, ini adalah kode OTP anda, segera lakukan verivikasi dan jangan disebarkan ke siapapun - 
                    ${otp}
                `

        const emailObject = {
          name,
          to: email,
          from: 'amelkahandayani@gmail.com',
          subject: 'Register OTP Verification',
          text: textContent,
          html: htmlContent
        }

        Email.sendEmail(emailObject)
      }
    )
  }

  async forgotPassword(name, email, token) {
    const filePath = path.join(__dirname, '../views/email/forgotPassword.view.handlebars');
        fs.readFile(
            filePath,
            {encoding: 'utf8'},
            function(error, data) {
                const template = handlebars.compile(data);
                const dataTemplate = {
                    name: name,
                    token: token,
                };
                const htmlContent = template(dataTemplate);

                const textContent = `
                    Halo ${name}, ini adalah token untuk reset password - 
                    ${token}
                `;

                const emailObject = {
                    name: name,
                    to: email,
                    from: 'amelkahandayani@gmail.com',
                    subject: 'Forgot Password',
                    text: textContent,
                    // html: htmlContent,
                }

                Email.sendEmail(emailObject);
            }
        );
  }
}

module.exports = new EmailService()
