const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const helmet = require('helmet')
const routes = require('./routes')
require('dotenv').config()


const app = express();
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(routes)


const port = process.env.DEFAULT_PORT || 8888
app.listen(port, () => {
    console.log(`Listening at localhost:${port}`)
})
