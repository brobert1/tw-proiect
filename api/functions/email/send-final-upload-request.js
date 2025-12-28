import { logger } from '@lib';
import { sendEmail } from '@plugins/nodemailer';

const sendFinalUploadRequest = async ({ email, paper, conference }) => {
  const templateData = {
    to: email,
    subject: `Upload Final Version - ${paper.title}`,
    type: 'finalUploadRequest',
    data: {
      paper_title: paper.title,
      conference_name: conference.name,
      url: `${process.env.APP_BASE_URL}/author/conferences/${conference.id}`,
    },
  };

  try {
    await sendEmail(templateData);
    logger.info(`Final upload request email sent to ${email} for paper: ${paper.title}`);
  } catch (error) {
    logger.error(`Failed to send final upload request email to ${email}:`, {
      error: error.message,
      paper: paper.title,
    });
    throw error;
  }
};

export default sendFinalUploadRequest;
