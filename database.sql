-- SQL Schema for Al Adeel Advertising LLC cPanel MySQL Database
-- Run this SQL query in phpMyAdmin to create the leads table

CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) DEFAULT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150) DEFAULT NULL,
    service VARCHAR(100) NOT NULL,
    product VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    emirate VARCHAR(100) NOT NULL DEFAULT 'Dubai',
    total_aed VARCHAR(50) NOT NULL,
    notes TEXT DEFAULT NULL,
    status ENUM('New', 'Contacted', 'In Production', 'Completed') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
