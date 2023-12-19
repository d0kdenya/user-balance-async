const Router = require('express')
const balanceController = require("../controllers/balanceController");
const router = new Router()

router.get('/:userId', balanceController.getUser)
router.post('/increase/:userId', balanceController.increaseBalance)
router.post('/decrease/:userId', balanceController.decreaseBalance)

module.exports = router
