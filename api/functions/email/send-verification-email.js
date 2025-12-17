import { logger } from '@lib';
import { sendEmail } from '@plugins/nodemailer';

const sendVerificationEmail = async ({ email, name, token }) => {
  const templateData = {
    to: email,
    subject: 'Verify your email - Confera',
    type: 'emailVerification',
    data: {
      userName: name,
      verificationUrl: `${process.env.APP_BASE_URL}/verify-email/${token}`,
    },
  };

  try {
    await sendEmail(templateData);
    logger.info(`Verification email sent to ${email}`);
  } catch (error) {
    logger.error(`Failed to send verification email to ${email}:`, {
      error: error.message,
    });
    throw error;
  }
};

export default sendVerificationEmail;
