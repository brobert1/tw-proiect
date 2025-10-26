import { logger } from '@lib';
import transporter from './config.js';
import createEmail from './create-email.js';

/**
 * Send an email via SMTP2GO
 * @param {Object} data - Email configuration
 * @param {string} data.to - Recipient email address
 * @param {string} data.subject - Email subject
 * @param {string} data.type - Email template type (optional)
 * @param {string} data.html - Custom HTML content (optional, used if type not provided)
 * @param {string} data.text - Plain text content (optional)
 * @param {string} data.from - Custom sender (optional)
 * @param {Object} data.data - Template data variables (optional)
 * @returns {Promise<Object>} - Send result
 */
const sendEmail = async (data) => {
  try {
    const payload = await createEmail(data);
    const info = await transporter.sendMail(payload);

    logger.info(`Email sent successfully to ${data.to}`, { messageId: info.messageId });

    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    logger.error('SMTP2GO error:', { error: error.message, to: data.to });
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export default sendEmail;
