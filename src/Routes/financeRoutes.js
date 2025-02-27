const express = require('express')
const router = express.Router()
const {
  renderCreateFinancePage,
  createFinanceRecord,
  deleteFinanceRecord,
  renderUpdateFinancePage,
  updateFinanceRecord,
  viewAllFinanceRecords
} = require('../controllers/financeController')

router.get('/', renderCreateFinancePage)
router.post('/create', createFinanceRecord)
router.get('/delete/:id', deleteFinanceRecord)
router.get('/update/:id', renderUpdateFinancePage)
router.post('/update', updateFinanceRecord)
router.get('/all', viewAllFinanceRecords)

module.exports = router
