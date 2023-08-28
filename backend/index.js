const connectToMongo = require('./database');
const express = require('express')
const cors = require('cors')
const app = express();
const port = 5000;

app.use(cors())  // providing a Connect/Express middleware that can be used to enable CORS with various options.

// To use req.body() we have to use a middleware app.use(express.json())
app.use(express.json())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`noteX server listening on port http://localhost:${port}`)
})
connectToMongo();