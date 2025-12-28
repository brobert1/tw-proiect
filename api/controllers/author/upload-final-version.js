import { knex } from '@db';
import { error, uploadPdf } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { paperId } = req.params;
  const file = req.files?.file;

  if (!file) {
    throw error(400, 'File is required');
  }

  if (file.mimetype !== 'application/pdf') {
    throw error(400, 'Only PDF files are allowed');
  }

  const paper = await knex('papers')
    .first('id', 'title', 'user_id', 'conference_id', 'status')
    .where('id', '=', paperId);

  if (!paper) {
    throw error(404, 'Paper not found');
  }

  if (paper.user_id !== me) {
    throw error(403, 'You are not the author of this paper');
  }

  if (paper.status !== 'awaiting_final') {
    throw error(400, 'Paper is not awaiting final version upload');
  }

  const latestVersion = await knex('paper_versions')
    .first('version_number')
    .where('paper_id', '=', paperId)
    .orderBy('version_number', 'desc');

  const newVersionNumber = (latestVersion?.version_number || 0) + 1;

  const filePath = `papers/${me}/${paper.conference_id}/v${newVersionNumber}.pdf`;
  await uploadPdf(filePath, file.data);
  const fileUrl = `https://${process.env.AWS_S3_BUCKET}.${process.env.AWS_S3_REGION}.cdn.digitaloceanspaces.com/${process.env.AWS_S3_FOLDER}/${filePath}`;

  await knex('paper_versions').insert({
    paper_id: paperId,
    file_url: fileUrl,
    version_number: newVersionNumber,
    is_final_version: true,
  });

  await knex('papers').where('id', '=', paperId).update({
    status: 'final_submitted',
    updated_at: knex.fn.now(),
  });

  return res.status(200).json({
    message: 'Final version uploaded successfully',
    version: newVersionNumber,
    file_url: fileUrl,
  });
};
