const Funcionario = require('../models/Funcionario')

const renderCreateFuncionarioPage = (req, res) => {
  res.render('funcionarios/registrarfuncionarios')
}

const createFuncionarioRecord = async (req, res) => {
  const { nome, cpf, telefone, email, endereco, cargo, salario } = req.body

  if (!nome || !cpf || !telefone || !email || !endereco || !cargo || !salario) {
    return res.status(400).json({
      message: 'Um campo obrigatório está em branco!'
    })
  }

  const funcionario = {
    nome,
    cpf,
    telefone,
    email,
    endereco,
    cargo,
    salario
  }

  try {
    await Funcionario.create(funcionario)
    res.redirect('/funcionario/all')
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao criar registro: ' + err.message)
  }
}

const viewAllFuncionariosRecords = async (req, res) => {
  try {
    const records = await Funcionario.findAll()
    const plainRecords = records.map((record) => record.get({ plain: true }))
    res.render('funcionarios/listarfuncionarios', { records: plainRecords })
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao buscar registros.')
  }
}

const deleteFuncionarioRecord = async (req, res) => {
  const { id } = req.params

  try {
    await Funcionario.destroy({ where: { id } })
    res.redirect('/funcionario/all')
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao deletar registro: ' + error.message)
  }
}

const renderUpdateFuncionarioPage = async (req, res) => {
  const { id } = req.params

  try {
    const record = await Funcionario.findByPk(id)
    if (record) {
      res.render('funcionarios/editarfuncionarios', {
        funcionario: record.get({ plain: true })
      })
    } else {
      res.status(404).send('Registro não encontrado')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar registro para edição.')
  }
}

const updateFuncionarioRecord = async (req, res) => {
  const { id, nome, cpf, telefone, email, endereco, cargo, salario } = req.body

  if (!nome || !cpf || !telefone || !email || !endereco || !cargo || !salario) {
    return res.status(400).json({
      message: 'Um campo obrigatório está em branco!'
    })
  }

  try {
    const [updated] = await Funcionario.update(
      { nome, cpf, telefone, email, endereco, cargo, salario },
      { where: { id } }
    )

    if (updated) {
      return res.redirect('/funcionario/all')
    } else {
      return res.status(404).send('Registro não encontrado.')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Erro ao atualizar registro: ' + error.message)
  }
}

module.exports = {
  renderCreateFuncionarioPage,
  createFuncionarioRecord,
  viewAllFuncionariosRecords,
  deleteFuncionarioRecord,
  renderUpdateFuncionarioPage,
  updateFuncionarioRecord
}
