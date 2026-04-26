-- Hompata Property Listing Platform Database Schema

-- Create database
CREATE DATABASE IF NOT EXISTS hompata CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hompata;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'landlord', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Listings table
CREATE TABLE listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    type ENUM('rent', 'sale') NOT NULL,
    bedrooms INT NOT NULL,
    county VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    sublocation VARCHAR(100),
    landlord_id INT NOT NULL,
    status ENUM('active', 'declined', 'deleted') NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (landlord_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_landlord (landlord_id),
    INDEX idx_status (status),
    INDEX idx_type (type),
    INDEX idx_price (price),
    INDEX idx_location (county, area, sublocation),
    INDEX idx_created_at (created_at)
);

-- Images table
CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    INDEX idx_listing (listing_id)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin', 'admin@hompata.com', '$2a$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQ', 'admin');

-- Insert sample landlord user (password: landlord123)
INSERT INTO users (name, email, password, role) VALUES 
('John Landlord', 'john@hompata.com', '$2a$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQ', 'landlord');

-- Insert sample properties
INSERT INTO listings (title, description, price, type, bedrooms, county, area, sublocation, landlord_id) VALUES 
('Modern 2 Bedroom Apartment in Kilimani', 'Beautiful modern apartment with amazing views, close to shopping centers and restaurants', 25000.00, 'rent', 2, 'Nairobi', 'Kilimani', 'Kilimani', 2),
('Spacious 3 Bedroom House in Lavington', 'Lovely family home with garden, parking for 2 cars, and modern amenities', 45000.00, 'rent', 3, 'Nairobi', 'Lavington', 'Lavington', 2),
('Luxury 1 Bedroom Studio in Westlands', 'Perfect for young professionals, fully furnished with high-end appliances', 18000.00, 'rent', 1, 'Nairobi', 'Westlands', 'Westlands', 2),
('4 Bedroom Family Home in Karen', 'Elegant family home with swimming pool, garden, and 24-hour security', 150000.00, 'sale', 4, 'Nairobi', 'Karen', 'Karen', 2),
('Cozy 2 Bedroom in Eastleigh', 'Affordable and convenient, close to public transport and shopping', 15000.00, 'rent', 2, 'Nairobi', 'Eastleigh', 'Section 1', 2);
