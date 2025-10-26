import { compile } from 'handlebars';
import * as views from '../views/index.js';

/**
 * Create email payload for nodemailer
 * @param {Object} params - Email parameters
 * @param {string} params.to - Recipient email
 * @param {string} params.subject - Email subject
 * @param {string} params.type - Template type (if using pre-built templates)
 * @param {string} params.html - Custom HTML (if not using templates)
 * @param {string} params.text - Plain text fallback
 * @param {string} params.from - Custom from address
 * @param {Object} params.data - Template variables
 * @returns {Object} - Nodemailer email payload
 */
const createEmail = async ({ from, to, subject, type, html, text, data = {} }) => {
  if (!to || !subject) {
    throw new Error('Missing required parameters: to and subject are required');
  }

  const fromEmail = from || process.env.SMTP_FROM_EMAIL;
  const fromName = process.env.SMTP_FROM_NAME || 'Conference Management System';

  // Add global template variables
  data.app_base_url = process.env.APP_BASE_URL;
  data.from_email = fromEmail;
  data.subject = subject;

  let htmlBody = html;

  // If type is provided, use pre-built template
  if (type) {
    if (!views[type]) {
      throw new Error(`Invalid email type: ${type}`);
    }

    // Get template string and compile with Handlebars
    const template = compile(views[type]);
    htmlBody = template(data);
  }

  // If no HTML provided and no type, throw error
  if (!htmlBody) {
    throw new Error('Either type or html must be provided');
  }

  return {
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html: htmlBody,
    text: text || stripHtml(htmlBody),
  };
};

/**
 * Helper: Strip HTML tags for plain text fallback
 * @param {string} html - HTML string
 * @returns {string} - Plain text
 */
const stripHtml = (html) => {
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export default createEmail;
