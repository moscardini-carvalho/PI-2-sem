const Tarefas = require('../models/Tasks')

const renderCreateTasksPage = (req, res) => {
  res.render('tarefas/registrartarefas')
}

const createTasksRecord = async (req, res) => {
  const { titulo, descricao, data, prioridade } = req.body
  console.log(req.body)

  if (!titulo || !descricao || !data || !prioridade) {
    return res.status(400).json({
      message: 'Todos os campos são obrigatórios!'
    })
  }

  try {
    await Tarefas.create({
      titulo,
      descricao,
      data,
      prioridade,
      status: 'pendente'
    })
    res.redirect('/tasks/pendentes')
  } catch (err) {
    console.error('Erro ao criar tarefa:', err)
    res.status(500).send('Erro ao criar tarefa: ' + err.message)
  }
}

const viewPendingTasks = async (req, res) => {
  try {
    const tarefasPendentes = await Tarefas.findAll({
      where: { status: 'pendente' }
    })

    const tarefasJSON = tarefasPendentes.map((tarefa) => tarefa.toJSON())

    console.log('Tarefas Pendentes:', tarefasJSON)

    res.render('tarefas/listartarefaspendentes', { tarefas: tarefasJSON })
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao buscar tarefas pendentes.')
  }
}

const viewCompletedTasks = async (req, res) => {
  try {
    const tarefasConcluidas = await Tarefas.findAll({
      where: { status: 'concluida' }
    })

    const tarefasJSON = tarefasConcluidas.map((tarefa) => tarefa.toJSON())

    console.log('Tarefas Concluídas:', tarefasJSON)

    res.render('tarefas/listartarefasconcluidas', { records: tarefasJSON })
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao buscar tarefas concluídas.')
  }
}

const deleteTasksRecord = async (req, res) => {
  const { id } = req.params
  try {
    await Tarefas.destroy({ where: { id } })
    res.redirect('/tasks/pendentes')
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao excluir tarefa: ' + err.message)
  }
}

const renderUpdateTasksPage = async (req, res) => {
  const { id } = req.params

  try {
    const record = await Tarefas.findByPk(id)
    if (record) {
      res.render('tarefas/editartarefas', {
        tarefa: record.get({ plain: true })
      })
    } else {
      res.status(404).send('Registro não encontrado')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Erro ao buscar registro para edição.')
  }
}

const updateTasksRecord = async (req, res) => {
  const { id, titulo, descricao, data, prioridade } = req.body

  if (!id || !titulo || !descricao || !data || !prioridade) {
    return res.status(400).json({
      message: 'ID, título, descrição, data e prioridade são obrigatórios.'
    })
  }

  try {
    const [updated] = await Tarefas.update(
      { titulo, descricao, data, prioridade },
      { where: { id } }
    )

    if (updated) {
      return res.redirect('/tasks/pendentes')
    } else {
      return res.status(404).send('Tarefa não encontrada.')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Erro ao atualizar tarefa: ' + error.message)
  }
}

const markTaskAsCompleted = async (req, res) => {
  const { id } = req.params
  try {
    const tarefa = await Tarefas.findByPk(id)
    console.log(tarefa)
    if (!tarefa) {
      return res.status(404).send('Tarefa não encontrada')
    }
    tarefa.status = 'concluida'
    await tarefa.save()
    res.redirect('/tasks/pendentes')
  } catch (err) {
    console.error('Erro ao concluir tarefa:', err)
    return res.status(500).send('Erro ao concluir tarefa: ' + err.message)
  }
}

module.exports = {
  renderCreateTasksPage,
  createTasksRecord,
  viewPendingTasks,
  viewCompletedTasks,
  deleteTasksRecord,
  renderUpdateTasksPage,
  updateTasksRecord,
  markTaskAsCompleted
}
