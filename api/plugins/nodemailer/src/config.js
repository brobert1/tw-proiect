import nodemailer from 'nodemailer';
import { logger } from '@lib';

// Create reusable transporter object using SMTP2GO credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Accept self-signed certificates
  },
});

// Verify SMTP connection configuration
transporter.verify((error, success) => {
  if (error) {
    logger.error('SMTP2GO connection error:', error);
  } else {
    logger.info('SMTP2GO server is ready to send emails');
  }
});

export default transporter;
