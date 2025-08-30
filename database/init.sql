-- Create database
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(15) NOT NULL,
  image TEXT,
  email_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES 
('Delhi Public School', '123 Education Street', 'New Delhi', 'Delhi', '9876543210', 'dps.jpg', 'info@dps.edu.in'),
('Kendriya Vidyalaya', '456 School Road', 'Mumbai', 'Maharashtra', '9876543211', 'kv.jpg', 'info@kv.edu.in'),
('Modern School', '789 Learning Avenue', 'Bangalore', 'Karnataka', '9876543212', 'modern.jpg', 'contact@modernschool.edu.in');