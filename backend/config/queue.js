const Queue = require('bull');

// Create the email queue
const wellcome_queue = new Queue('wellcome_queue', process.env.REDIS_URL);
const email_verification_queue = new Queue('email_verification_queue', process.env.REDIS_URL);
const forget_password_queue = new Queue('forget_password_queue', process.env.REDIS_URL);

module.exports ={ wellcome_queue,email_verification_queue, forget_password_queue}
