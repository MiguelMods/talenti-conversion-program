const getAllCoin = (req, res) => {
  res.status(200).json({ data: [] })
}

const getCoinById = (req, res) => {
  res.status(200).json({ data: {} })
}

const postCoin = (req, res) => {
  res.status(201).send('success')
}

const putCoin = (req, res) => {
  res.status(201).send('success')
}

module.exports = {
  getAllCoin,
  getCoinById,
  postCoin,
  putCoin
}
