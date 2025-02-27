const Finance = require('../models/Finance')

const renderCreateFinancePage = (req, res) => {
  res.render('finance/Finance')
}

const createFinanceRecord = async (req, res) => {
  const { name, cargo, description, amount, date } = req.body

  if (!name || !cargo || !description || !amount || !date) {
    return res.status(400).json({
      message: 'Name, cargo, description, amount, and date are required.'
    })
  }

  try {
    await Finance.create({ name, cargo, description, amount, date })
    res.redirect('/finance/all')
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao criar registro: ' + error.message)
  }
}

const deleteFinanceRecord = async (req, res) => {
  const { id } = req.params

  try {
    await Finance.destroy({ where: { id } })
    res.redirect('/finance/all')
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao deletar registro: ' + error.message)
  }
}

const renderUpdateFinancePage = async (req, res) => {
  const { id } = req.params

  try {
    const record = await Finance.findByPk(id)
    if (record) {
      res.render('finance/updateFinance', {
        finance: record.get({ plain: true })
      })
    } else {
      res.status(404).send('Registro não encontrado')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar registro para edição.')
  }
}

const updateFinanceRecord = async (req, res) => {
  const { id, name, cargo, description, amount, date } = req.body

  if (!id || !name || !cargo || !description || !amount || !date) {
    return res.status(400).json({
      message: 'ID, name, cargo, description, amount, and date are required.'
    })
  }

  try {
    const [updated] = await Finance.update(
      { name, cargo, description, amount, date },
      { where: { id } }
    )

    if (updated) {
      return res.redirect('/finance/all')
    } else {
      return res.status(404).send('Registro não encontrado.')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Erro ao atualizar registro: ' + error.message)
  }
}

const viewAllFinanceRecords = async (req, res) => {
  try {
    const records = await Finance.findAll()
    const plainRecords = records.map((record) => record.get({ plain: true }))
    res.render('finance/allFinances', { records: plainRecords })
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar registros.')
  }
}

module.exports = {
  renderCreateFinancePage,
  createFinanceRecord,
  deleteFinanceRecord,
  renderUpdateFinancePage,
  updateFinanceRecord,
  viewAllFinanceRecords
}
