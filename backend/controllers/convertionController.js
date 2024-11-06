const { MonedaFactores } = require('../models/MonedaFactores')
const convertions = require('../models/Convertions')

const post = async (req, res) => {
  try {
    const factor = await MonedaFactores.findOne((factor) => factor.monedaOrigen === req.body.monedaOrigen && factor.monedaDestino === req.body.monedaDestino)
    if (!factor) res.status(400).json({ messages: 'No se han encontrado ningun valor para realizar la operacion' })
    // eslint-disable-next-line new-cap
    const conversion = new convertions({
      monto: req.body.monto,
      monedaOrigen: req.body.monedaOrigen,
      monedaDestino: req.body.monedaDestino,
      resultado: 0
    })
    const newConvertion = await conversion.save()
    res.status(201).json({ data: newConvertion })
  } catch (error) {
    res.status(400).json({ messages: error.messages })
  }
}

const getConvertionById = (req, res) => {
  res.status(200).json({ data: {} })
}

const getAllConvertionHistories = async (req, res) => {
  try {
    res.status(200).json({ data: await convertions.find() })
  } catch (error) {
    res.status(500).json({ messages: error.messages })
  }
}

module.exports = {
  post,
  getConvertionById,
  getAllConvertionHistories
}
