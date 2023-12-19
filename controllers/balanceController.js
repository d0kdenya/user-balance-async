const balanceService = require('../services/balanceService')

class BalanceController {
  async getUser(req, res, next) {
    try {
      const id = req.params.userId
      const user = await balanceService.getUser(id)
      return res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async increaseBalance(req, res, next) {
    try {
      const id = req.params.userId
      const amount = parseInt(req.body.amount)
      const result = await balanceService.increaseBalance(id, amount)
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }

  async decreaseBalance(req, res, next) {
    try {
      const id = req.params.userId
      const amount = parseInt(req.body.amount)
      const result = await balanceService.decreaseBalance(id, amount)
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new BalanceController()