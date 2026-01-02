const Item = require('../../models/Item');

// @desc    Search items by text
// @route   GET /api/items/search
// @access  Public
exports.searchItems = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query (q) is required'
      });
    }

    const filter = {
      $or: [
        { 'productIdentity.itemName': new RegExp(q, 'i') },
        { 'productIdentity.brandName': new RegExp(q, 'i') },
        { 'productDescription.productDescription': new RegExp(q, 'i') },
        { 'listingIdentity.sku': new RegExp(q, 'i') }
      ]
    };

    const items = await Item.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Item.countDocuments(filter);

    res.json({
      success: true,
      count: items.length,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalItems: count,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get items by status
// @route   GET /api/items/status/:status
// @access  Public
exports.getItemsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const items = await Item.find({ status })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Item.countDocuments({ status });

    res.json({
      success: true,
      count: items.length,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalItems: count,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update item status
// @route   PATCH /api/items/:id/status
// @access  Private
exports.updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['active', 'inactive', 'draft'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be: active, inactive, or draft'
      });
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Filter items by price range
// @route   GET /api/items/filter/price
// @access  Public
exports.filterByPriceRange = async (req, res) => {
  try {
    const { min, max, page = 1, limit = 10 } = req.query;

    if (!min && !max) {
      return res.status(400).json({
        success: false,
        error: 'Either min or max price is required'
      });
    }

    const filter = { 'offer.yourPriceINR': {} };
    if (min) filter['offer.yourPriceINR'].$gte = parseFloat(min);
    if (max) filter['offer.yourPriceINR'].$lte = parseFloat(max);

    const items = await Item.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ 'offer.yourPriceINR': 1 });

    const count = await Item.countDocuments(filter);

    res.json({
      success: true,
      count: items.length,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalItems: count,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Filter items by brand
// @route   GET /api/items/filter/brand/:brand
// @access  Public
exports.filterByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const filter = { 'productIdentity.brandName': new RegExp(brand, 'i') };

    const items = await Item.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Item.countDocuments(filter);

    res.json({
      success: true,
      count: items.length,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalItems: count,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
