const express = require('express')
const router = express.Router()

const {
  renderCreateFeedbackPage,
  createFeedbackRecord,
  viewAllFeedbacksRecords,
  deleteFeedbackRecord,
  renderUpdateFeedbackPage,
  updateFeedbackRecord
} = require('../controllers/feedbackController')

router.get('/all', viewAllFeedbacksRecords)
router.post('/create', createFeedbackRecord)
router.get('/delete/:id', deleteFeedbackRecord)
router.get('/update/:id', renderUpdateFeedbackPage)
router.post('/update', updateFeedbackRecord)
router.get('/:id', renderCreateFeedbackPage)

module.exports = router
