const Item = require('../../models/Item');

// @desc    Bulk create items
// @route   POST /api/items/bulk
// @access  Private
exports.bulkCreateItems = async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Items array is required'
      });
    }

    const createdItems = await Item.insertMany(items, { ordered: false });

    res.status(201).json({
      success: true,
      count: createdItems.length,
      data: createdItems
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Bulk update items
// @route   PUT /api/items/bulk-update
// @access  Private
exports.bulkUpdateItems = async (req, res) => {
  try {
    const { updates } = req.body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Updates array is required with format: [{id, data}]'
      });
    }

    const bulkOps = updates.map(update => ({
      updateOne: {
        filter: { _id: update.id },
        update: { $set: update.data }
      }
    }));

    const result = await Item.bulkWrite(bulkOps);

    res.json({
      success: true,
      modified: result.modifiedCount,
      matched: result.matchedCount
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Bulk delete items
// @route   DELETE /api/items/bulk-delete
// @access  Private
exports.bulkDeleteItems = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'IDs array is required'
      });
    }

    const result = await Item.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      deletedCount: result.deletedCount,
      message: `${result.deletedCount} items deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Bulk update status
// @route   PATCH /api/items/bulk-status
// @access  Private
exports.bulkUpdateStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'IDs array is required'
      });
    }

    if (!['active', 'inactive', 'draft'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be: active, inactive, or draft'
      });
    }

    const result = await Item.updateMany(
      { _id: { $in: ids } },
      { $set: { status } }
    );

    res.json({
      success: true,
      modifiedCount: result.modifiedCount,
      message: `${result.modifiedCount} items status updated to ${status}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
