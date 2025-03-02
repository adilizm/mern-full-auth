import { transporter } from '../config/nodemailer.js';
import { email_verification_queue } from '../config/queue.js';

email_verification_queue.process(async (job) => {
    const { to, username,verification_code } = job.data;

    const info = await transporter.sendMail({
        from: '"adil izm" <app@example.com>', // sender address
        to: to,
        subject: "Verify Your Email",
        text: `Hi ${username}, Here is your email verification code : ${verification_code} , this code is only valide for the next 24h`
        // html: `<b>Hello</b>`,
    });

    console.log('verify Email sent:', info.response);
    return true;
});

const SendEmailVerificationJob = async (to, username,verification_code) => {
    const delay = 0; // in milliseconds

    const job = await email_verification_queue.add(
        {
            to,
            username,
            verification_code
        },
        {
            delay, // Set the delay
        }
    );
}

export {SendEmailVerificationJob} 