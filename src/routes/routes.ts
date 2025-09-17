import { Router } from 'express';
import multer from 'multer';
import { uploadCSV } from '../controllers/upload.controller';

const router = Router();
const upload = multer({ dest: 'storage/uploads/' });

router.get('/', (req, res) => {
  res.json({ 
    message: 'API DescompilcAI está funcionando! 🚀',
    version: '1.0.0'
  });
});

router.post('/upload', upload.single('csvFile'), uploadCSV);

export default router;
