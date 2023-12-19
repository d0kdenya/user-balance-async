require('dotenv').config({ path: `.${ process.env.NODE_ENV }.env` })

const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        app.listen(PORT, () => console.log(`Server started on ${ PORT } port`))
    } catch(e) {
        console.log(e)
    }
}

start()
