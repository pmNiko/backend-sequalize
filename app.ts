import dotenv from 'dotenv'
dotenv.config()
import Server from './models/sever'

const server = new Server()

server.listen()

