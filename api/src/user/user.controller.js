import User from './user.model.js'
import bcrypt from 'bcryptjs'
import createAccessToken from '../libs/createAccessToken.js'
import { connectDb } from '../libs/connectDb.js'
import jwt from 'jsonwebtoken'

export async function verifyToken(req, res) {
  try {
    const { token } = req.cookies

    if (!token) {
      return res.status(401).json({ message: "You don't have a token" })
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, user) => {
      if (err)
        return res.status(500).json({ message: 'sin autorizacion', error: err })

      const userFound = await User.findById(user.id)

      if (!userFound) {
        return res.status(404).json({ message: 'El usuario no existe' })
      }
      return res.status(200).json({
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        favorites: userFound.favorites,
      })
    })
  } catch (error) {
    res
      .status(500)
      .json({
        message: 'Ocurrio un problema al validar el token',
        error: error,
      })
  }
}

export const register = async (req, res) => {
  try {
    await connectDb()
    const { name, lastname, email, password } = req.body
    console.log(req.body)
    const emailFound = await User.findOne({ email })
    if (emailFound)
      return res.status(400).json({ error: 'El email ya fue utilizado' })

    const passHashed = await bcrypt.hash(password, 10)
    const newUser = new User({
      name,
      lastname,
      email,
      password: passHashed,
    })

    const savedUser = await newUser.save()
    const token = await createAccessToken({ id: savedUser._id })
    res.cookie('token', token, {
      sameSite: 'None',
    })

    res.status(201).json({
      name: savedUser.username,
      email: savedUser.email,
      favorites: savedUser.favorites,
    })
  } catch (error) {
    res.status(400).json({ error: error.message, details: error.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    await connectDb()
    const userFound = await User.findOne({ email })

    if (!userFound)
      return res.status(400).json({
        error: 'El correo ingresado no existe',
      })

    const comparePassword = await bcrypt.compare(password, userFound.password)
    if (!comparePassword)
      return res
        .status(400)
        .json({ error: 'La contraseña que has introducido es incorrecta.' })

    const accessToken = await createAccessToken({ id: userFound._id })

    res.cookie('token', accessToken, {
      domain: process.env.NODE_ENV === 'development' ? 'localhost' : 'www.eride.paku.com.ar',
    })

    res.json({
      name: userFound.name,
      email: userFound.email,
      favorites: userFound.favorites,
    })
  } catch (error) {
    res.status(400).json({ error: error.message, details: error.message })
  }
}

export const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(404).json({ message: 'No hay un token' });
    }

    res.clearCookie('token')
    return res.json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(400).json({ message: 'Error al salir de la cuenta', error });
  }
};

export const profile = async (req, res) => {
  try {
    await connectDb()
    const userFound = await User.findById(req.user.id)
      .select('name lastname email shipping')
      .lean()

    if (!userFound)
      return res.status(404).json({ error: 'Usuario no encontrado' })

    return res.json(userFound)
  } catch (error) {
    res.status(400).json({ error: error.message, details: error.message })
  }
}

export const editProfile = async (req, res) => {
  try {
    await connectDb()
    const newData = req.body
    const userFound = await User.findByIdAndUpdate(req.user.id, newData)

    if (!userFound)
      return res.status(404).json({ error: 'Usuario no encontrado' })

    return res.json('Usuario actualizado')
  } catch (error) {
    res.status(400).json({
      error: error,
      message: 'Hubo un error al intentar actualizar el usuario',
    })
  }
}

export async function getUserFavorites(req, res) {
  try {
    await connectDb()
    const userId = req.user.id

    if (!userId) {
      return res.status(400).json({ error: 'ID de usuario no proporcionado' })
    }

    const user = await User.findById(userId).select('favorites').lean()

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    return res.json({ favorites: user.favorites })
  } catch (error) {
    return res.status(500).json({
      message: 'Error al obtener favoritos',
      error: error.message,
    })
  }
}

export async function addToFavorites(req, res) {
  const { productId } = req.body
  console.log('adding', productId)
  try {
    connectDb()
    const userFound = await User.findById(req.user.id)

    if (!userFound) {
      console.log('No se encotro usuario')
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    if (!userFound.favorites.includes(productId)) {
      userFound.favorites.push(productId) // Lo agregamos
      await userFound.save()
      return res.json({
        favorites: userFound.favorites,
        message: 'producto agregado',
      })
    } else {
      userFound.favorites.pull(productId) // Lo eliminamos
      await userFound.save()
      return res.json({
        favorites: userFound.favorites,
        message: 'producto eliminado',
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error al intentar agregar favorito',
      error: error,
    })
  }
}
