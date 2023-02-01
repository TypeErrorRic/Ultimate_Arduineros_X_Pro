import {createPool} from 'mysql2/promise'

const DB_HOST = 'us-east.connect.psdb.cloud'
const DB_USER = 'opsz5mvqxt909ki1j7gg'
const DB_PASSWORD = 'pscale_pw_nnJmckxh22DQ0kLymRX0RnZUGzYERGpJoI8MDkHYSCK'
const DB_NAME = 'plantica'

export const connect = await createPool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
})

export const PORT = process.env.PORT || 3000;
