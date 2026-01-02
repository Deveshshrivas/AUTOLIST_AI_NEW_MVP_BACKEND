const ShopifyProduct = require('../../models/ShopifyDB/ShopifyProduct');

// @desc    Get product by Shopify ID
// @route   GET /api/shopify/products/shopify/:shopifyId
// @access  Public
exports.getByShopifyId = async (req, res) => {
  try {
    const product = await ShopifyProduct.findOne({ shopify_id: req.params.shopifyId });

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

// @desc    Get product by handle
// @route   GET /api/shopify/products/handle/:handle
// @access  Public
exports.getByHandle = async (req, res) => {
  try {
    const product = await ShopifyProduct.findOne({ handle: req.params.handle });

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

// @desc    Search products
// @route   GET /api/shopify/products/search
// @access  Public
exports.searchProducts = async (req, res) => {
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
        { title: new RegExp(q, 'i') },
        { body_html: new RegExp(q, 'i') },
        { tags: new RegExp(q, 'i') },
        { vendor: new RegExp(q, 'i') }
      ]
    };

    const products = await ShopifyProduct.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ created_at: -1 });

    const count = await ShopifyProduct.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalItems: count,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
