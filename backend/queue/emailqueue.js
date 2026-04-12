
import Queue from "bull";

const emailQueue = new Queue("emailQueue", process.env.REDIS_URL, {
  redis: {
    tls: {
      rejectUnauthorized: false
    }
  }
});

export default emailQueue;