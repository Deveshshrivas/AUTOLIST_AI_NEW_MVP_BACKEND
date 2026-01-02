const express = require('express');
const router = express.Router();
const {
  bulkCreateItems,
  bulkUpdateItems,
  bulkDeleteItems,
  bulkUpdateStatus
} = require('../../controllers/amazon');

// Bulk operations
router.post('/items/bulk', bulkCreateItems);
router.put('/items/bulk-update', bulkUpdateItems);
router.delete('/items/bulk-delete', bulkDeleteItems);
router.patch('/items/bulk-status', bulkUpdateStatus);

module.exports = router;
