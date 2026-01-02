const ShopifyProduct = require('../../models/ShopifyDB/ShopifyProduct');

// @desc    Get all Shopify products
// @route   GET /api/shopify/products
// @access  Public
exports.getAllProducts = async (req, res) => {
  try {
    const { status, vendor, product_type, page = 1, limit = 10 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (vendor) filter.vendor = new RegExp(vendor, 'i');
    if (product_type) filter.product_type = new RegExp(product_type, 'i');

    const products = await ShopifyProduct.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ created_at: -1 });

    const count = await ShopifyProduct.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/shopify/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await ShopifyProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Create new product
// @route   POST /api/shopify/products
// @access  Private
exports.createProduct = async (req, res) => {
  try {
    const product = await ShopifyProduct.create(req.body);
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Update product
// @route   PUT /api/shopify/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
  try {
    const product = await ShopifyProduct.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/shopify/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
  try {
    const product = await ShopifyProduct.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: {},
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
