const Item = require('../../models/Item');

// @desc    Get specific section of item
// @route   GET /api/items/:id/:section
// @access  Public
exports.getItemSection = async (req, res) => {
  try {
    const { id, section } = req.params;
    const item = await Item.findById(id).select(section);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item[section] || {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update specific section of item
// @route   PATCH /api/items/:id/:section
// @access  Private
exports.updateItemSection = async (req, res) => {
  try {
    const { id, section } = req.params;
    const updateData = {};
    updateData[section] = req.body;

    const item = await Item.findByIdAndUpdate(
      id,
      { $set: updateData },
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

// @desc    Update listing identity section
// @route   PATCH /api/items/:id/listing-identity
// @access  Private
exports.updateListingIdentity = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { listingIdentity: req.body } },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item.listingIdentity
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update product identity section
// @route   PATCH /api/items/:id/product-identity
// @access  Private
exports.updateProductIdentity = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { productIdentity: req.body } },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item.productIdentity
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update offer section
// @route   PATCH /api/items/:id/offer
// @access  Private
exports.updateOffer = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { offer: req.body } },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item.offer
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update images section
// @route   PATCH /api/items/:id/images
// @access  Private
exports.updateImages = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { images: req.body } },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item.images
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update compliance section
// @route   PATCH /api/items/:id/compliance
// @access  Private
exports.updateCompliance = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { complianceRegulatory: req.body } },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item.complianceRegulatory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};
