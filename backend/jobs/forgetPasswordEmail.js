import { transporter } from '../config/nodemailer.js';
import { forget_password_queue } from '../config/queue.js';

forget_password_queue.process(async (job) => {
    const { to, username, verification_code } = job.data;

    const info = await transporter.sendMail({
        from: '"adil izm" <app@example.com>', // sender address
        to: to,
        subject: "Request password reset",
        text: `Hi ${username}, Here is your password reset code : ${verification_code} , this code is only valide for the next 10 minutes`
        // html: `<b>Hello</b>`,
    });

    console.log(' Email sent:', info.response);
    return true;
});

const SendEmailPasswordResetJob = async (to, username, verification_code) => {
    const delay = 0; // in milliseconds

    const job = await forget_password_queue.add(
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

export { SendEmailPasswordResetJob }