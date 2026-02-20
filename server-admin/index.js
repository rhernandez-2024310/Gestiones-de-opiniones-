import dotenv from 'dotenv'
import { initServer } from './configs/app.js' 

dotenv.config()


initServer()

process.on('unhandledRejection', (err) => {
    console.error(`[Error Crítico]: ${err.message}`)
})