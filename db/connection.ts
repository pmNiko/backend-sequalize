import { Sequelize } from 'sequelize'

const { DB, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const database: string = DB || 'node'
const db_user: string = DB_USER || 'Nikolas'
const db_password: string = DB_PASSWORD || 'nikolas89'

const db = new Sequelize(database, db_user, db_password, {
  host: DB_HOST || 'localhost',
  dialect: 'postgres',
  // logging: false
})

export default db