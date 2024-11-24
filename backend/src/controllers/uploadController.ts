import { Request, Response } from 'express';
import { uploadFile } from '../services/uploadService';

interface MulterRequest extends Request {
    file: Express.Multer.File;
}

export const handleFileUpload = async (req: MulterRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Dosya bulunamadı' });
        }

        if (!req.user?.id) {
            return res.status(401).json({ error: 'Kullanıcı kimliği bulunamadı' });
        }

        const fileUrl = await uploadFile(req.file, req.user.id);
        res.json({ url: fileUrl });
    } catch (error) {
        console.error('Upload hatası:', error);
        res.status(500).json({ error: 'Dosya yükleme hatası' });
    }
};