import mercadopago from 'mercadopago'
import { Router } from 'express'

const router = Router()

router.post('/create_preference', async (req, res) => {
  mercadopago.configure({
    access_token: process.env.MP_TOKEN,
  })

  let preference = {
    items: [
      {
        title: req.body.description,
        currency_id: 'ARS',
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],

    back_urls: {
      success: 'http://localhost:5173',
      failure: 'http://localhost:5173',
      pending: '',
    },
    auto_return: 'approved', //despues de 5s retorna a la pagina principal
  }

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})

export default router
