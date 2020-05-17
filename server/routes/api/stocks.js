const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get stock
router.get('/', async (req, res) => {
  const stocks = await loadStocks()
  res.send(await stocks.find({}).toArray())
})

// Add stock
router.post('/', async (req, res) => {
  const stocks = await loadStocks()
  await stocks.insertOne({
    text: req.body.text,
    createdAt: new Date()
  })
  res.status(201).send
})

// Delete stock
router.delete('/:id', async (req, res) => {
  const stocks = await loadStocks()
  await stocks.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
  res.status(200).send()
})

// Connect to MongoDB client
async function loadStocks() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://Rylee:67poscQus2S8mDy9@dbcluster-62xju.azure.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }, 
  )
  
  return client.db('market').collection('stocks')
}

module.exports = router