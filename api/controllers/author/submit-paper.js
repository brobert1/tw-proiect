import { knex } from '@db';
import { error, uploadPdf } from '@functions';

export default async (req, res) => {
  const { me } = req.user;
  if (!me) {
    throw error(401, 'Unauthorized');
  }

  const { conferenceId, title, abstract, topics, coAuthors } = req.body;
  const file = req.files?.file;

  if (!conferenceId) {
    throw error(400, 'Conference ID is required');
  }

  if (!title || !abstract) {
    throw error(400, 'Title and abstract are required');
  }

  if (!file) {
    throw error(400, 'Paper file is required');
  }

  if (file.mimetype !== 'application/pdf') {
    throw error(400, 'Only PDF files are allowed');
  }

  const existingPaper = await knex('papers')
    .first('id')
    .where('user_id', '=', me)
    .where('conference_id', '=', conferenceId);

  if (existingPaper) {
    throw error(400, 'You have already submitted a paper to this conference');
  }

  const conference = await knex('conferences')
    .first('id', 'name')
    .where('id', '=', conferenceId)
    .whereIn('status', ['upcoming', 'ongoing']);

  if (!conference) {
    throw error(404, 'Conference not found or not accepting submissions');
  }

  const parsedTopics = typeof topics === 'string' ? JSON.parse(topics) : topics || [];
  const parsedCoAuthors = typeof coAuthors === 'string' ? JSON.parse(coAuthors) : coAuthors || [];

  const [paper] = await knex('papers')
    .insert({
      user_id: me,
      conference_id: conferenceId,
      title,
      abstract,
      topics: JSON.stringify(parsedTopics),
      co_authors: JSON.stringify(parsedCoAuthors),
      status: 'submitted',
    })
    .returning(['id', 'title', 'abstract', 'topics', 'co_authors', 'status', 'created_at']);

  const versionNumber = 1;

  const filePath = `papers/${me}/${conferenceId}/v${versionNumber}.pdf`;
  await uploadPdf(filePath, file.data);
  const fileUrl = `https://${process.env.AWS_S3_BUCKET}.${process.env.AWS_S3_REGION}.cdn.digitaloceanspaces.com/${process.env.AWS_S3_FOLDER}/${filePath}`;

  const [version] = await knex('paper_versions')
    .insert({
      paper_id: paper.id,
      file_url: fileUrl,
      version_number: versionNumber,
      is_final_version: false,
    })
    .returning(['id', 'version_number', 'file_url', 'created_at']);

  return res.status(201).json({
    data: {
      ...paper,
      version: version.version_number,
      file_url: version.file_url,
    },
    message: 'Paper submitted successfully',
  });
};
