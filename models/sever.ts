import express, { Application, json, urlencoded } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from '../routes/usuarios'
import db from '../db/connection'

class Server {
  private app: Application
  private port: string
  private apiPaths = {
    usuarios: '/api/usuarios'
  }

  constructor() {

    this.app = express()
    this.port = process.env.PORT || '8000'

    this.dbConnection()

    this.middlewares()

    this.routes()
  }

  async dbConnection() {
    try {
      await db.authenticate()
      console.log("Base de datos conectada.");

    } catch (error) {
      throw new Error(error)
    }
  }

  middlewares() {
    // Peticiones cross dommain
    this.app.use(cors())

    // Lectura del body
    this.app.use(json())

    // Permite envio de datos a travez de un form
    this.app.use(urlencoded({ extended: false }))

    // Log de peticiones 
    this.app.use(morgan('dev'))

    // Carpeta publica
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRouter)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server corriendo en el port ${this.port}`)
    })
  }
}

export default Server