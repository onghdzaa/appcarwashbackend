const express = require('express')
const app = express()
const PORT=process.env.port || 80
app.get('/', (req, res) => {
  res.json({ message: 'Ahoy!' })
})
app.listen(PORT, () => {
  console.log('Application is running on port 9000')
})