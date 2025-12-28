
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import knex from '../knexfile.js';
import Knex from 'knex';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const environment = process.env.NODE_ENV || 'development';
const config = knex[environment];
const db = Knex(config);

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  endpoint: process.env.AWS_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
  },
});

async function uploadPdfBuffer(filePath, buffer) {
    const key = process.env.AWS_S3_FOLDER ? `${process.env.AWS_S3_FOLDER}/${filePath}` : filePath;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: buffer,
        ACL: 'public-read',
        ContentType: 'application/pdf',
        ContentDisposition: 'inline',
    };

    await s3Client.send(new PutObjectCommand(params));
    
    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.${process.env.AWS_S3_REGION}.cdn.digitaloceanspaces.com/${process.env.AWS_S3_FOLDER}/${filePath}`;
    return fileUrl;
}

async function seedPdfs() {
    try {
        console.log('Starting PDF seeding...');
        const pendingVersions = await db('paper_versions')
            .select(
                'paper_versions.id',
                'paper_versions.paper_id',
                'paper_versions.version_number',
                'papers.user_id',
                'papers.conference_id'
            )
            .join('papers', 'paper_versions.paper_id', 'papers.id')
            .where('paper_versions.file_url', 'PENDING_UPLOAD');

        console.log(`Found ${pendingVersions.length} versions pending upload.`);

        if (pendingVersions.length === 0) {
            console.log('✓ No pending uploads. PDF seeding complete.');
            process.exit(0);
        }
        const DUMMY_PDF_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        console.log(`Downloading dummy PDF from ${DUMMY_PDF_URL}...`);
        const response = await axios.get(DUMMY_PDF_URL, { responseType: 'arraybuffer' });
        const pdfBuffer = Buffer.from(response.data);
        console.log('✓ Dummy PDF downloaded.');

        for (const version of pendingVersions) {
            const filePath = `papers/${version.user_id}/${version.conference_id}/v${version.version_number}.pdf`;
            
            console.log(`Uploading ${filePath} to Spaces...`);
            const fileUrl = await uploadPdfBuffer(filePath, pdfBuffer);
            
            await db('paper_versions')
                .where('id', version.id)
                .update({ file_url: fileUrl });
                
            console.log(`✓ Updated version ${version.id} with URL: ${fileUrl}`);
        }
        
        console.log('✓ PDF seeding complete');
        process.exit(0);

    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seedPdfs();

