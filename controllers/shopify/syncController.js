const ShopifyProduct = require('../../models/ShopifyDB/ShopifyProduct');

// @desc    Bulk create products
// @route   POST /api/shopify/products/bulk
// @access  Private
exports.bulkCreate = async (req, res) => {
  try {
    const { products } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Products array is required'
      });
    }

    const createdProducts = await ShopifyProduct.insertMany(products, { ordered: false });

    res.status(201).json({
      success: true,
      count: createdProducts.length,
      data: createdProducts
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Sync product (upsert)
// @route   POST /api/shopify/products/sync
// @access  Private
exports.syncProduct = async (req, res) => {
  try {
    const { shopify_id } = req.body;

    if (!shopify_id) {
      return res.status(400).json({
        success: false,
        error: 'shopify_id is required'
      });
    }

    const product = await ShopifyProduct.findOneAndUpdate(
      { shopify_id },
      { ...req.body, synced_at: new Date() },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
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
