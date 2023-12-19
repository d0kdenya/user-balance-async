const { User } = require('../models/models')
const ApiError = require('../exceptions/apiError')
const sequelize = require('../db')

class BalanceService {
  async getUser(id) {
    return await User.findByPk(id)
  }

  async increaseBalance(id, amount) {
    if (!id) {
      throw ApiError.BadRequest('Некорректный id пользователя!')
    }
    if (!amount || amount < 0) {
      throw ApiError.BadRequest('Некорректная сумма увеличения!')
    }

    const t = await sequelize.transaction();

    try {
      const user = await User.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE })

      if (!user) {
        throw ApiError.BadRequest('Пользователь не найден!')
      }

      user.balance += amount

      await user.save({ transaction: t })

      await t.commit();

      return { message: 'Баланс успешно увеличен!', balance: user.balance }
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async decreaseBalance(id, amount) {
    if (!id) {
      throw ApiError.BadRequest('Некорректный id пользователя!');
    }
    if (!amount || amount < 0) {
      throw ApiError.BadRequest('Некорректная сумма уменьшения!');
    }

    const t = await sequelize.transaction();

    try {
      const user = await User.findByPk(id, { transaction: t, lock: t.LOCK.UPDATE });

      if (!user) {
        throw ApiError.BadRequest('Пользователь не найден!');
      }
      if (user.balance - amount < 0) {
        throw ApiError.BadRequest('Недостаточно средств на балансе');
      }

      user.balance -= amount;

      await user.save({ transaction: t });

      await t.commit();

      return { message: 'Баланс успешно уменьшен!', balance: user.balance };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = new BalanceService()