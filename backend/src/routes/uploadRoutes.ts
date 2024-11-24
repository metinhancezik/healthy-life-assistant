import express, { Request, Response } from 'express';
import multer from 'multer';
import { handleFileUpload } from '../controllers/uploadController';
import { auth } from '../middleware/auth';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// RequestHandler tipini express'ten kullanıyoruz
router.post('/upload', auth, upload.single('file'), (req: Request, res: Response) => {
    handleFileUpload(req as any, res);
});

export default router;