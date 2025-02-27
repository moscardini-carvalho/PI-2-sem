const express = require('express')
const router = express.Router()
const {
  renderCreateTasksPage,
  createTasksRecord,
  deleteTasksRecord,
  renderUpdateTasksPage,
  updateTasksRecord,
  viewPendingTasks,
  viewCompletedTasks,
  markTaskAsCompleted
} = require('../controllers/TasksController')

router.get('/', renderCreateTasksPage)
router.post('/create', createTasksRecord)
router.get('/delete/:id', deleteTasksRecord)
router.get('/update/:id', renderUpdateTasksPage)
router.post('/update/:id', updateTasksRecord)
router.get('/pendentes', viewPendingTasks)
router.get('/concluidas', viewCompletedTasks)
router.post('/concluir/:id', markTaskAsCompleted)

module.exports = router
