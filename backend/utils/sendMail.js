const nodemailer = require('nodemailer')

const sendMail = async (options, email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'mail.1000pharma.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'info@1000pharma.com', // your cPanel email address
                pass: 'My0Q^-id}r]R' // your cPanel email password
            }
        })

        const mailOptions = {
            from: 'info@1000pharma.com',
            to: email ?? 'cntpc1000@gmail.com',
            subject: options?.objet ?? '',
            text: options?.text ?? '-',
            html: options?.html ?? '-'
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log('Email : ' + error)
    }
}

module.exports = sendMail
