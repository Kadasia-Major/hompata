import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

const pool = mysql.createPool(dbConfig)

export const getConnection = async () => {
  try {
    const connection = await pool.getConnection()
    return connection
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}

export const executeQuery = async (query, params = []) => {
  try {
    const connection = await getConnection()
    const [rows] = await connection.execute(query, params)
    connection.release()
    return rows
  } catch (error) {
    console.error('Query execution failed:', error)
    throw error
  }
}

export default pool
