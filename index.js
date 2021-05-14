const express = require('express')
const app = express()
const port=process.env.PORT || 80
app.get('/', (req, res) => {
  res.json({ message: 'Ahoy!' })
})
app.listen(port, () => {
  console.log('Application is running on port '+port)
})