const post = (req, res) => {
  res.status(200).json({ resultado: 0 })
}

const getConvertionById = (req, res) => {
  res.status(200).json({ data: {} })
}

const getAllConvertionHistories = (req, res) => {
  res.status(200).json({ data: [] })
}

module.exports = {
  post,
  getConvertionById,
  getAllConvertionHistories
}
