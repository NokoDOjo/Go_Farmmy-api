const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { response } = require('express')
const OAuth2 = google.auth.OAuth2

const emailNotice = {
  sendEmail: (customerEmail, emailSubject, emailContent) => {
    const oauth2Client = new OAuth2(
      process.env.GOOGLE_ID,
      process.env.GOOGLE_SECRET,
      'https://developers.google.com/oauthplayground'
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.refreshToken
    })

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_ACCOUNT,
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        refreshToken: process.env.refreshToken,
        accessToken: process.env.accessToken
      }
    })

    const mailOptions = {
      from: process.env.GMAIL_ACCOUNT,
      to: customerEmail,
      subject: emailSubject,
      generateTextFromHTML: true,
      html: emailContent
    }

    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(response)
      smtpTransport.close()
    })
  }
}

module.exports = emailNotice