const Router = require('express')
const router = new Router()
const balanceRouter = require('./balanceRouter')

router.use('/balance', balanceRouter)

module.exports = router