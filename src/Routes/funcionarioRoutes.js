const express = require('express')
const router = express.Router()
const {
  renderCreateFuncionarioPage,
  createFuncionarioRecord,
  viewAllFuncionariosRecords,
  deleteFuncionarioRecord,
  renderUpdateFuncionarioPage,
  updateFuncionarioRecord
} = require('../controllers/funcionarioController')

router.get('/', renderCreateFuncionarioPage)
router.post('/create', createFuncionarioRecord)
router.get('/delete/:id', deleteFuncionarioRecord)
router.get('/update/:id', renderUpdateFuncionarioPage)
router.post('/update', updateFuncionarioRecord)
router.get('/all', viewAllFuncionariosRecords)

module.exports = router
