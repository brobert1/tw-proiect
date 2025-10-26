import { logger } from '@lib';
import { sendEmail } from '@plugins/nodemailer';

const sendWelcomeEmail = async (user) => {
  const templateData = {
    to: user.email,
    subject: 'Welcome to Conference Management System',
    type: 'welcome',
    data: {
      userName: user.name,
      role: user.role,
      loginUrl: `${process.env.APP_BASE_URL}/login`,
    },
  };

  try {
    await sendEmail(templateData);
    logger.info(`Welcome email sent to ${user.email}`);
  } catch (error) {
    logger.error(`Failed to send welcome email to ${user.email}:`, { error: error.message });
    throw error;
  }
};

export default sendWelcomeEmail;
