const Monedas = require('../models/Monedas')

const getAllCoin = async (req, res) => {
  try {
    const monedas = await Monedas.find()
    res.status(200).json({ data: monedas })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las monedas' })
  }
}

const getCoinById = async (req, res) => {
  try {
    const moneda = await Monedas.findById(req.params.id)
    if (!moneda) return res.status(404).json({ message: 'Sin Datos a mostrar' })
    res.status(200).json({ data: moneda })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la moneda' })
  }
}

const postCoin = async (req, res) => {
  try {
    const moneda = new Monedas({
      codigo: req.body.codigo,
      descripcion: req.body.descripcion,
      estatus: true
    })

    const newMoneda = await moneda.save()
    res.status(201).json({ data: newMoneda })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const putCoin = async (req, res) => {
  try {
    const moneda = await Monedas.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!moneda) return res.status(404).json({ message: 'Moneda no encontrada' })
    res.status(201).json({ data: moneda })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllCoin,
  getCoinById,
  postCoin,
  putCoin
}
