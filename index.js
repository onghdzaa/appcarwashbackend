const express = require('express')
const app = express()
const PORT=process.env.PORT || '80'
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit: '50mb'}));
app.get("/", (req, res) => {
  res.json({ message: 'Ahoy!' })
})
app.listen(PORT, () => {
  console.log('Application is running on port '+PORT)
})