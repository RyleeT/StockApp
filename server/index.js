// Dependencies
const express = require('express')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())

const stocks = require('./routes/api/stocks')

app.use('/api/stocks', stocks)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))