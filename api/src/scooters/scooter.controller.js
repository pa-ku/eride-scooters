import Scooter from './scooter.model.js'
import { connectDb } from '../libs/connectDb.js'


export const getAll = async (req, res) => {
  try {
    await connectDb()
    const { brand, tag } = req.query

    const filter = {}
    if (brand !== undefined) filter.brand = brand
    if (tag !== undefined) filter.tag = tag

    const itemsFiltered = await Scooter.find(filter)
      .select('title coverImage price discount _id brand')
      .lean()

    if (!itemsFiltered.length) {
      return res.status(404).json({ error: 'No se encontraron elementos' })
    }
    res.json(itemsFiltered)
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al obtener los elementos', details: error.message })
  }
}


export async function getNames(req, res) {
  try {
    await connectDb()
    const itemsByName = await Scooter.find().select('title _id').lean()
    return res.json(itemsByName)
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al obtener los nombres', details: error.message })
  }
}



export const getOneById = async (req, res) => {
  try {
    await connectDb()
    const oneItem = await Scooter.findById(req.params.id).lean()
    if (!oneItem) {
      return res.status(404).json({ error: 'No se encontro el elemento' })
    }
    res.json(oneItem)
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al buscar el elemento', details: error.message })
  }
}

export const getScootersById = async (req, res) => {
  try {
    await connectDb()
    const idsArray = req.body.ids
    const manyItems = await Scooter.find({ _id: { $in: idsArray } })
      .select('title coverImage price discount _id')
      .lean()
    if (!manyItems.length) {
      return res.status(404).json({ error: 'No se encontraron elementos' })
    }

    res.json(manyItems)
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Error al buscar los elementos', details: error.message })
  }
}

export const createOne = async (req, res) => {
  try {
    await connectDb()
    const data = req.body
    const newItem = new Scooter(data)
    const savedItem = await newItem.save()
    res.status(201).json({
      title: savedItem.title,
      brand: savedItem.brand,
      price: savedItem.price,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'El título ya está en uso. Por favor, elija otro.',
      })
    }
    res.status(400).json({
      error: 'error al intentar crear el recurso',
      details: error.message,
    })
  }
}

export const deleteOne = async (req, res) => {
  try {
    await connectDb()
    const oneItem = await Scooter.findByIdAndDelete(req.params.id)
    if (!oneItem) {
      return res.status(404).json({ error: 'tarea no encontrada' })
    }
    res.json(oneItem)
  } catch (error) {
    res.status(400).json({
      error: 'Error al intentar eliminar el recurso',
      details: error.message,
    })
  }
}

export const updateOne = async (req, res) => {
  try {
    await connectDb()
    const oneItem = await Scooter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!oneItem) {
      return res
        .status(404)
        .json({ error: 'No se encontro el elemento', details: error.message })
    }
    res.json(oneItem)
  } catch (error) {
    {
      res.status(400).json({
        error: 'Error al intentar modificar el elemento',
        details: error.message,
      })
    }
  }
}


export const getScootersByFilter = async (req, res) => {
  try {
    await connectDb()

    const type = req.params.type

    const filters = {
      featured: { tag: 'featured' },
      bestSellers: { tag: 'bestSeller' },
      bestOffers: { discount: { $gte: 20 } },
    }
    const filter = filters[type]

    if (!filter) {
      return res.status(400).json({ error: 'Filtro no válido' })
    }
    const selectOptions = '_id coverImage price discount title'
    const scooters = type === 'featured' ? await Scooter.findOne(filter).select(`${selectOptions} description`).lean() : await Scooter.find(filter).select(selectOptions).lean().limit(5)

    res.json(scooters)
  } catch (error) {
    res.status(500).json({
      error: 'Error al buscar scooters',
      details: error.message,
    })
  }
}