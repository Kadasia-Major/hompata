#!/bin/bash

echo "🏠 Setting up Hompata Database..."

# Check if MySQL is running
if ! systemctl is-active --quiet mysql; then
    echo "❌ MySQL is not running. Please start MySQL first."
    exit 1
fi

# Prompt for MySQL root password
echo "🔐 Enter MySQL root password:"
read -s mysql_password

# Create database and tables
mysql -u root -p"$mysql_password" < schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo ""
    echo "📋 Default Login Credentials:"
    echo "Admin: admin@hompata.com / admin123"
    echo "Landlord: john@hompata.com / landlord123"
    echo ""
    echo "🚀 You can now start the application:"
    echo "1. cd server && npm run dev"
    echo "2. cd client && npm run dev"
else
    echo "❌ Database setup failed. Please check your MySQL credentials."
fi
