import { transporter } from '../config/nodemailer.js';
import { wellcome_queue } from '../config/queue.js';

wellcome_queue.process(async (job) => {
    const { to, username } = job.data;

    const info = await transporter.sendMail({
        from: '"adil izm" <app@example.com>', // sender address
        to: to,
        subject: "Welcome to Our Service!",
        text: `Hi ${username}, Welcome to our service! We're excited to have you on board.`
        // html: `<b>Hello</b>`,
    });

    console.log('Email sent:', info.response);
    return true;
});

const WellcomeEmailJob = async (to, username) => {
    const delay = 0; // in milliseconds

    const job = await wellcome_queue.add(
        {
            to,
            username,
            text: 'This is a simple test email.',
        },
        {
            delay, // Set the delay
        }
    );
}

export {WellcomeEmailJob} 