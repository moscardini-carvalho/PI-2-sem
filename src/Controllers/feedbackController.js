const Funcionario = require('../models/Funcionario')
const Feedback = require('../models/Feedback')

const renderCreateFeedbackPage = async (req, res) => {
  const funcionarioId = req.params.id

  try {
    const record = await Funcionario.findByPk(funcionarioId)
    if (record) {
      res.render('feedbacks/registrarfeedback', {
        funcionario: record.get({ plain: true })
      })
    } else {
      res.status(404).send('Registro não encontrado')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao buscar registro.')
  }
}

const createFeedbackRecord = async (req, res) => {
  const { tipo_feedback, data, descricao, funcionarioId } = req.body

  if (!tipo_feedback || !data || !descricao) {
    return res.status(400).json({
      message: 'Um campo obrigatório está em branco!'
    })
  }

  const feedback = {
    tipo_feedback,
    data,
    descricao,
    FuncionarioId: funcionarioId
  }

  try {
    await Feedback.create(feedback)
    res.redirect('/feedback/all')
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao criar registro: ' + err.message)
  }
}

const viewAllFeedbacksRecords = async (req, res) => {
  try {
    const records = await Feedback.findAll({
      include: [
        {
          model: Funcionario,
          attributes: ['nome']
        }
      ]
    })

    const plainRecords = records.map((record) => record.get({ plain: true }))

    res.render('feedbacks/listarfeedbacks', { records: plainRecords })
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao buscar registros.')
  }
}

const deleteFeedbackRecord = async (req, res) => {
  const { id } = req.params

  try {
    await Feedback.destroy({ where: { id } })
    res.redirect('/feedback/all')
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao deletar registro: ' + error.message)
  }
}

const renderUpdateFeedbackPage = async (req, res) => {
  const { id } = req.params

  try {
    const feedbackRecord = await Feedback.findByPk(id, {
      include: {
        model: Funcionario,
        attributes: ['nome']
      }
    })

    if (feedbackRecord) {
      res.render('feedbacks/editarfeedback', {
        feedback: feedbackRecord.get({ plain: true }),
        funcionario: feedbackRecord.Funcionario
      })
    } else {
      res.status(404).send('Feedback não encontrado')
    }
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao buscar feedback para edição.')
  }
}

const updateFeedbackRecord = async (req, res) => {
  const { id, tipo_feedback, data, descricao } = req.body

  if (!tipo_feedback || !data || !descricao) {
    return res.status(400).json({
      message: 'Um campo obrigatório está em branco!'
    })
  }

  try {
    const [updated] = await Feedback.update(
      { tipo_feedback, data, descricao },
      { where: { id } }
    )

    if (updated) {
      res.redirect('/feedback/all')
    } else {
      res.status(404).send('Feedback não encontrado.')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao atualizar o feedback: ' + error.message)
  }
}

module.exports = {
  renderCreateFeedbackPage,
  createFeedbackRecord,
  viewAllFeedbacksRecords,
  deleteFeedbackRecord,
  renderUpdateFeedbackPage,
  updateFeedbackRecord
}
