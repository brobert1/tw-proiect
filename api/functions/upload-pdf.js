import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  endpoint: process.env.AWS_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

/**
 * Upload a PDF file to S3 with inline display headers
 */
export const uploadPdf = async (filename, data) => {
  const key = process.env.AWS_S3_FOLDER ? `${process.env.AWS_S3_FOLDER}/${filename}` : filename;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: data,
    ACL: 'public-read',
    ContentType: 'application/pdf',
    ContentDisposition: 'inline',
  };

  return await s3Client.send(new PutObjectCommand(params));
};
