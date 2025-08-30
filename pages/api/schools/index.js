import connection from '../../../lib/db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'school-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

const uploadMiddleware = promisify(upload.single('image'));

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await connection.execute('SELECT * FROM schools ORDER BY created_at DESC');
      res.status(200).json({ success: true, data: rows });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch schools' });
    }
  } else if (req.method === 'POST') {
    try {
      // Handle file upload
      await uploadMiddleware(req, res);
      
      const { name, address, city, state, contact, email_id } = req.body;
      const imagePath = req.file ? `/schoolImages/${req.file.filename}` : null;

      // Validate required fields
      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email_id)) {
        return res.status(400).json({ success: false, error: 'Invalid email format' });
      }

      // Validate contact number
      const contactRegex = /^\d{10}$/;
      if (!contactRegex.test(contact)) {
        return res.status(400).json({ success: false, error: 'Contact number must be 10 digits' });
      }

      const [result] = await connection.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, imagePath, email_id]
      );

      res.status(201).json({ 
        success: true, 
        message: 'School added successfully',
        id: result.insertId 
      });
    } catch (error) {
      console.error('Error adding school:', error);
      res.status(500).json({ success: false, error: error.message || 'Failed to add school' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}