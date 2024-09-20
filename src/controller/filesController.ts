import { Request, Response } from 'express';

// TypeScript types for Multer's req.files
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const uploadFiles = async (req: Request, res: Response) => {
  try {
    // Log text fields like 'username'
    console.log(req.body);
    console.log(req.files);
    // Log the uploaded files (req.files will be an array or undefined)
    const files = req.files as MulterFile[] | undefined;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    // Respond with success and the uploaded files info
    res.json({
      message: 'Files uploaded successfully!',
      files: files.map((file) => ({
        originalname: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: file.size,
        path: file.path,
      })),
    });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ message: 'File upload failed.', error });
  }
};
