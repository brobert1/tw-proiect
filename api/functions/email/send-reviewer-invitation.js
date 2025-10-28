import { logger } from '@lib';
import { sendEmail } from '@plugins/nodemailer';

const sendReviewerInvitation = async ({ email, conference }) => {
  const templateData = {
    to: email,
    subject: `Invitation to become reviewer for ${conference.name}`,
    type: 'reviewerInvitation',
    data: {
      conference_name: conference.name,
      conference_acronym: conference.acronym,
      conference_start_date: conference.date,
      conference_end_date: conference.date,
      conference_location: conference.location,
      url: `${process.env.APP_BASE_URL}/reviewer`,
    },
  };

  try {
    await sendEmail(templateData);
    logger.info(`Reviewer invitation email sent to ${email} for conference: ${conference.name}`);
  } catch (error) {
    logger.error(`Failed to send reviewer invitation email to ${email}:`, {
      error: error.message,
      conference: conference.name,
    });
    throw error;
  }
};

export default sendReviewerInvitation;
