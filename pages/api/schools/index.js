import { supabase } from '../../../lib/supabase';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for temporary file storage
const upload = multer({ dest: '/tmp/' });
const uploadMiddleware = promisify(upload.single('image'));

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Debug: Log image URLs
      data.forEach(school => {
        if (school.image) {
          console.log(`📸 School "${school.name}" image URL:`, school.image);
        }
      });
      
      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error('Error fetching schools:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch schools' });
    }
  } else if (req.method === 'POST') {
    try {
      // Handle file upload
      await uploadMiddleware(req, res);
      
      const { name, address, city, state, contact, email_id } = req.body;
      let imagePath = null;
      
      // Upload image to Cloudinary if file exists
      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'school-images',
            public_id: `school-${Date.now()}`,
            overwrite: true,
            resource_type: 'image'
          });
          imagePath = result.secure_url;
          console.log('✅ Cloudinary upload successful:', imagePath);
          
          // Delete temporary file
          fs.unlinkSync(req.file.path);
        } catch (uploadError) {
          console.error('Cloudinary upload error:', uploadError);
        }
      }

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

      // Insert into Supabase
      const { data, error } = await supabase
        .from('schools')
        .insert([{
          name,
          address, 
          city,
          state,
          contact,
          email_id,
          image: imagePath
        }])
        .select();

      if (error) throw error;

      res.status(201).json({ 
        success: true, 
        message: 'School added successfully',
        data: data[0] 
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