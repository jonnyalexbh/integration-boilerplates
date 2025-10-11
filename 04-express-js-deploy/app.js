const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: '🚀 Express API is running successfully on AWS',
    timestamp: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
