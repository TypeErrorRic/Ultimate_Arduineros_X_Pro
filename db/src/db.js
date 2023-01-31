import {createPool} from 'mysql2/promise'

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || '312225cp'
const DB_NAME = process.env.DB_NAME || 'Plantica'
const DB_PORT = process.env.DB_PORT || 3306


export const connect  = createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
})

export const PORT = process.env.PORT || 3000;
