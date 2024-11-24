import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../config/aws-config';

interface File {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
}

export const uploadFile = async (file: File, userId: string) => {
    const key = `profiles/${userId}/${Date.now()}-${file.originalname}`;
    
    try {
        await s3Client.send(new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME || '',
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        }));

        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
        console.error('S3 yükleme hatası:', error);
        throw error;
    }
};