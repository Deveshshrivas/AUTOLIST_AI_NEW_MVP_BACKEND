const Item = require('../../models/Item');

// @desc    Get all items with advanced filtering
// @route   GET /api/items
// @access  Public
exports.getAllItems = async (req, res) => {
  try {
    const { 
      status, 
      brandName, 
      productType,
      vendor,
      minPrice,
      maxPrice,
      page = 1, 
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (brandName) filter['productIdentity.brandName'] = new RegExp(brandName, 'i');
    if (productType) filter['listingIdentity.productType'] = new RegExp(productType, 'i');
    if (vendor) filter['complianceRegulatory.countryOfOrigin'] = vendor;
    
    // Price range filter
    if (minPrice || maxPrice) {
      filter['offer.yourPriceINR'] = {};
      if (minPrice) filter['offer.yourPriceINR'].$gte = parseFloat(minPrice);
      if (maxPrice) filter['offer.yourPriceINR'].$lte = parseFloat(maxPrice);
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const items = await Item.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sort);

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

// @desc    Get single item by ID
// @route   GET /api/items/:id
// @access  Public
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

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
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get item by SKU
// @route   GET /api/items/sku/:sku
// @access  Public
exports.getItemBySku = async (req, res) => {
  try {
    const item = await Item.findOne({ 'listingIdentity.sku': req.params.sku.toUpperCase() });

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
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new item
// @route   POST /api/items
// @access  Private
exports.createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json({
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

// @desc    Update item
// @route   PUT /api/items/:id
// @access  Private
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
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

// @desc    Delete item
// @route   DELETE /api/items/:id
// @access  Private
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: {},
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
