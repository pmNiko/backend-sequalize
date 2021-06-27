import { ErrorRequestHandler, Request, Response } from 'express'
import Usuario from '../models/usuario'

export const getUsuarios = async (req: Request, res: Response) => {

  const usuarios = await Usuario.findAll()

  res.json({ usuarios })
}

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params

  const usuario = await Usuario.findByPk(id)

  if (!usuario) return res.status(404).json({ msg: 'User not found!' })

  res.json({
    usuario
  })
}

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req

  try {
    const email_exist = await Usuario.findOne({
      where: { email: body.email }
    })

    if (email_exist) return res.status(400).json({ msg: `Ya existe el email ${body.email}` })

    const usuario = await Usuario.create(body)
    res.json({
      msg: 'postUsuario', usuario
    })
  } catch (err) {
    const [ValidationErrorItem] = err.errors
    console.log('err.errors', ValidationErrorItem.message);

    res.status(500).json({ msg: `Database not found` })

  }

}

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req

  try {
    const user = await Usuario.findOne({ where: { id: id } })

    if (!user) return res.status(400).json({ msg: "No existe el usuario con id: ", id })

    await user.update(body)

    res.json({ user })
  } catch (err) {
    const [ValidationErrorItem] = err.errors
    console.log('err.errors', ValidationErrorItem.message);

    res.status(500).json({ msg: `Database not found` })

  }

}

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await Usuario.findOne({ where: { id: id } })

    if (!user) return res.status(400).json({ msg: "No existe el usuario con id: ", id })

    user.update({ estado: false })

    res.json({ user })
  } catch (err) {
    const [ValidationErrorItem] = err.errors
    console.log('err.errors', ValidationErrorItem.message);

    res.status(500).json({ msg: `Database not found` })
  }
}

