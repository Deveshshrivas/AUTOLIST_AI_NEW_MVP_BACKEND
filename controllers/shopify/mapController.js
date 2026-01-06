const ShopifyProduct = require('../../models/ShopifyDB/ShopifyProduct');
const Item = require('../../models/Item');

// Get default value from environment or use 'NA' as fallback
const DEFAULT_VALUE = process.env.DEFAULT_VALUE || 'NA';

/**
 * Map Shopify product fields to Amazon Item fields
 */
const mapShopifyToAmazon = (shopifyProduct) => {
  // Get first variant for pricing info
  const firstVariant = shopifyProduct.variants && shopifyProduct.variants.length > 0 
    ? shopifyProduct.variants[0] 
    : null;

  return {
    // A. Listing Identity
    listingIdentity: {
      sku: firstVariant?.sku || shopifyProduct.shopify_id?.toString() || DEFAULT_VALUE,
      listingAction: 'CREATE',
      productType: shopifyProduct.product_type || DEFAULT_VALUE
    },

    // B. Product Identity
    productIdentity: {
      itemName: shopifyProduct.title || DEFAULT_VALUE,
      brandName: shopifyProduct.vendor || DEFAULT_VALUE,
      productIdType: 'EAN',
      productId: shopifyProduct.shopify_id?.toString() || DEFAULT_VALUE,
      manufacturer: shopifyProduct.vendor || DEFAULT_VALUE
    },

    // C. Offer
    offer: {
      yourPriceINR: firstVariant?.price ? parseFloat(firstVariant.price) : 0,
      quantity: firstVariant?.inventory_quantity || 0,
      itemCondition: 'New',
      fulfillmentChannelCode: 'DEFAULT'
    },

    // D. Product Description
    productDescription: {
      productDescription: shopifyProduct.body_html?.replace(/<[^>]*>/g, '') || DEFAULT_VALUE,
      bulletPoint1: shopifyProduct.tags || DEFAULT_VALUE
    },

    // E. Images
    images: {
      mainImageURL: shopifyProduct.images && shopifyProduct.images.length > 0 
        ? shopifyProduct.images[0].src 
        : DEFAULT_VALUE,
      otherImageURLs: {
        url1: shopifyProduct.images && shopifyProduct.images.length > 1 
          ? shopifyProduct.images[1].src 
          : DEFAULT_VALUE,
        url2: shopifyProduct.images && shopifyProduct.images.length > 2 
          ? shopifyProduct.images[2].src 
          : DEFAULT_VALUE,
        url3: shopifyProduct.images && shopifyProduct.images.length > 3 
          ? shopifyProduct.images[3].src 
          : DEFAULT_VALUE,
        url4: shopifyProduct.images && shopifyProduct.images.length > 4 
          ? shopifyProduct.images[4].src 
          : DEFAULT_VALUE,
        url5: shopifyProduct.images && shopifyProduct.images.length > 5 
          ? shopifyProduct.images[5].src 
          : DEFAULT_VALUE
      }
    },

    // Status mapping
    status: shopifyProduct.status === 'active' ? 'active' : 
            shopifyProduct.status === 'draft' ? 'draft' : 'inactive',

    // Store Shopify reference
    shopifyReference: {
      shopifyId: shopifyProduct.shopify_id?.toString(),
      handle: shopifyProduct.handle,
      syncedAt: new Date()
    }
  };
};

/**
 * Sync single Shopify product to Amazon items
 */
const syncSingleProduct = async (req, res) => {
  try {
    const { shopifyId } = req.params;

    // Find Shopify product
    const shopifyProduct = await ShopifyProduct.findOne({ shopify_id: shopifyId });
    
    if (!shopifyProduct) {
      return res.status(404).json({
        success: false,
        error: 'Shopify product not found'
      });
    }

    // Map to Amazon format
    const amazonData = mapShopifyToAmazon(shopifyProduct);

    // Check if already exists by SKU
    const existingItem = await Item.findOne({ 
      'listingIdentity.sku': amazonData.listingIdentity.sku 
    });

    let savedItem;
    if (existingItem) {
      // Update existing
      Object.assign(existingItem, amazonData);
      savedItem = await existingItem.save();
    } else {
      // Create new
      const newItem = new Item(amazonData);
      savedItem = await newItem.save();
    }

    res.status(200).json({
      success: true,
      message: existingItem ? 'Item updated' : 'Item created',
      data: savedItem
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Sync all Shopify products to Amazon items
 */
const syncAllProducts = async (req, res) => {
  try {
    // Get all Shopify products
    const shopifyProducts = await ShopifyProduct.find();

    if (shopifyProducts.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No Shopify products found'
      });
    }

    const results = {
      total: shopifyProducts.length,
      created: 0,
      updated: 0,
      failed: 0,
      errors: []
    };

    // Process each product
    for (const shopifyProduct of shopifyProducts) {
      try {
        // Map to Amazon format
        const amazonData = mapShopifyToAmazon(shopifyProduct);

        // Check if already exists by SKU
        const existingItem = await Item.findOne({ 
          'listingIdentity.sku': amazonData.listingIdentity.sku 
        });

        if (existingItem) {
          // Update existing
          Object.assign(existingItem, amazonData);
          await existingItem.save();
          results.updated++;
        } else {
          // Create new
          const newItem = new Item(amazonData);
          await newItem.save();
          results.created++;
        }

      } catch (error) {
        results.failed++;
        results.errors.push({
          shopifyId: shopifyProduct.shopify_id,
          error: error.message
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Sync completed',
      data: results
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Preview mapping without saving
 */
const previewMapping = async (req, res) => {
  try {
    const { shopifyId } = req.params;

    // Find Shopify product
    const shopifyProduct = await ShopifyProduct.findOne({ shopify_id: shopifyId });
    
    if (!shopifyProduct) {
      return res.status(404).json({
        success: false,
        error: 'Shopify product not found'
      });
    }

    // Map to Amazon format (preview only)
    const amazonData = mapShopifyToAmazon(shopifyProduct);

    res.status(200).json({
      success: true,
      message: 'Preview mapping (not saved)',
      shopifyData: shopifyProduct,
      amazonData: amazonData,
      defaultValue: DEFAULT_VALUE
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  syncSingleProduct,
  syncAllProducts,
  previewMapping
};
