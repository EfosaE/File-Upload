import multer from 'multer';
import { Router } from 'express';
import path from 'path';
import { uploadFiles } from '../controller/filesController';

const uploadRouter = Router();
// Configure Multer Storage (optional)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 'uploads/' is the folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renaming the file with a timestamp
  },
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });
uploadRouter.route('/').post(upload.array('files'), uploadFiles);

// Create the uploads folder if it doesn't exist
import fs from 'fs';
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}
export default uploadRouter