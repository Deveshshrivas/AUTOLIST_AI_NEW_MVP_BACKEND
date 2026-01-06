const ShopifyProduct = require('../../models/ShopifyDB/ShopifyProduct');
const Item = require('../../models/Item');

/**
 * Extract clean text from HTML
 */
const extractTextFromHTML = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Extract size information from description
 */
const extractSizeInfo = (bodyHtml) => {
  const sizeInfo = {
    kurta: null,
    bottom: null,
    dupatta: null
  };

  if (!bodyHtml) return sizeInfo;

  const kurtatMatch = bodyHtml.match(/Kurta[:\s]+([0-9.]+\s*Mtrs?)/i);
  const bottomMatch = bodyHtml.match(/Bottom[:\s]+([0-9.]+\s*Mtrs?)/i);
  const dupattaMatch = bodyHtml.match(/Duppata|Dupatta[:\s]+([0-9.]+\s*Mtrs?)/i);

  if (kurtatMatch) sizeInfo.kurta = kurtatMatch[1];
  if (bottomMatch) sizeInfo.bottom = bottomMatch[1];
  if (dupattaMatch) sizeInfo.dupatta = dupattaMatch[1];

  return sizeInfo;
};

/**
 * Extract material and care info from description
 */
const extractMaterialCare = (bodyHtml) => {
  const info = {
    material: null,
    care: null
  };

  if (!bodyHtml) return info;

  const materialMatch = bodyHtml.match(/Material[:\s]+([^<\n]+)/i);
  const careMatch = bodyHtml.match(/Care[:\s]+([^<\n]+)/i);

  if (materialMatch) info.material = materialMatch[1].trim();
  if (careMatch) info.care = careMatch[1].trim();

  return info;
};

/**
 * Extract bullet points from description
 */
const extractBulletPoints = (bodyHtml, tags) => {
  const bullets = [];
  
  // Try to extract from HTML lists
  const listMatches = bodyHtml?.match(/<li[^>]*>(.*?)<\/li>/gi) || [];
  listMatches.forEach((match, index) => {
    if (index < 5) {
      const text = extractTextFromHTML(match);
      if (text && text.length > 0) {
        bullets.push(text);
      }
    }
  });

  // If no bullets from HTML, use tags
  if (bullets.length === 0 && tags) {
    const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
    tagArray.forEach((tag, index) => {
      if (index < 5) bullets.push(tag);
    });
  }

  // Ensure we have 5 bullets (fill with empty if needed)
  while (bullets.length < 5) {
    bullets.push('');
  }

  return bullets.slice(0, 5);
};

/**
 * Analyze and process single product
 */
const analyzeSingleProduct = async (req, res) => {
  try {
    const { shopifyId } = req.params;

    const product = await ShopifyProduct.findOne({ shopify_id: shopifyId });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Extract data
    const cleanDescription = extractTextFromHTML(product.body_html);
    const sizeInfo = extractSizeInfo(product.body_html);
    const materialCare = extractMaterialCare(product.body_html);
    const bullets = extractBulletPoints(product.body_html, product.tags);

    // Variant analysis
    const variants = product.variants || [];
    const variantAnalysis = variants.map(v => ({
      id: v.id,
      title: v.title,
      sku: v.sku || 'Not Available',
      price: parseFloat(v.price) || 0,
      inventory: v.inventory_quantity || 0,
      options: {
        option1: v.option1,
        option2: v.option2,
        option3: v.option3
      }
    }));

    // Image analysis
    const images = product.images || [];
    const imageAnalysis = {
      total: images.length,
      mainImage: images.length > 0 ? images[0].src : null,
      thumbnails: images.slice(1, 6).map(img => ({
        src: img.src,
        alt: img.alt,
        position: img.position
      }))
    };

    // Pricing analysis
    const priceRange = {
      min: variants.length > 0 ? Math.min(...variants.map(v => parseFloat(v.price) || 0)) : 0,
      max: variants.length > 0 ? Math.max(...variants.map(v => parseFloat(v.price) || 0)) : 0,
      currency: 'INR'
    };

    // Inventory analysis
    const inventoryTotal = variants.reduce((sum, v) => sum + (v.inventory_quantity || 0), 0);

    // Build analysis result
    const analysis = {
      productInfo: {
        shopifyId: product.shopify_id,
        title: product.title,
        vendor: product.vendor,
        productType: product.product_type,
        status: product.status,
        handle: product.handle
      },
      description: {
        full: product.body_html,
        clean: cleanDescription,
        bulletPoints: bullets
      },
      specifications: {
        size: sizeInfo,
        material: materialCare.material,
        care: materialCare.care
      },
      variants: {
        count: variants.length,
        details: variantAnalysis
      },
      images: imageAnalysis,
      pricing: priceRange,
      inventory: {
        total: inventoryTotal,
        available: inventoryTotal > 0
      },
      metadata: {
        tags: product.tags,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
        publishedAt: product.published_at
      }
    };

    res.status(200).json({
      success: true,
      data: analysis
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Analyze all products and provide summary
 */
const analyzeAllProducts = async (req, res) => {
  try {
    const products = await ShopifyProduct.find();

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No products found'
      });
    }

    // Summary statistics
    const summary = {
      totalProducts: products.length,
      byStatus: {},
      byVendor: {},
      byProductType: {},
      totalInventory: 0,
      averagePrice: 0,
      priceRange: { min: Infinity, max: 0 },
      productsWithImages: 0,
      productsWithVariants: 0,
      productsWithTags: 0
    };

    let totalPrice = 0;
    let priceCount = 0;

    products.forEach(product => {
      // Status count
      summary.byStatus[product.status] = (summary.byStatus[product.status] || 0) + 1;

      // Vendor count
      summary.byVendor[product.vendor] = (summary.byVendor[product.vendor] || 0) + 1;

      // Product type count
      summary.byProductType[product.product_type] = (summary.byProductType[product.product_type] || 0) + 1;

      // Images
      if (product.images && product.images.length > 0) {
        summary.productsWithImages++;
      }

      // Variants
      if (product.variants && product.variants.length > 0) {
        summary.productsWithVariants++;
        
        product.variants.forEach(variant => {
          // Inventory
          summary.totalInventory += variant.inventory_quantity || 0;

          // Price
          const price = parseFloat(variant.price) || 0;
          if (price > 0) {
            totalPrice += price;
            priceCount++;
            summary.priceRange.min = Math.min(summary.priceRange.min, price);
            summary.priceRange.max = Math.max(summary.priceRange.max, price);
          }
        });
      }

      // Tags
      if (product.tags && product.tags.length > 0) {
        summary.productsWithTags++;
      }
    });

    summary.averagePrice = priceCount > 0 ? (totalPrice / priceCount).toFixed(2) : 0;
    
    if (summary.priceRange.min === Infinity) {
      summary.priceRange.min = 0;
    }

    res.status(200).json({
      success: true,
      data: summary
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get products that need data completion
 */
const getIncompleteProducts = async (req, res) => {
  try {
    const products = await ShopifyProduct.find();

    const incomplete = products.filter(product => {
      const issues = [];

      // Check for missing SKU
      const hasValidSku = product.variants?.some(v => v.sku && v.sku.trim() !== '');
      if (!hasValidSku) issues.push('Missing SKU');

      // Check for missing images
      if (!product.images || product.images.length === 0) {
        issues.push('No images');
      }

      // Check for missing description
      if (!product.body_html || product.body_html.trim() === '') {
        issues.push('No description');
      }

      // Check for zero inventory
      const totalInventory = product.variants?.reduce((sum, v) => sum + (v.inventory_quantity || 0), 0) || 0;
      if (totalInventory === 0) {
        issues.push('Zero inventory');
      }

      // Check for missing tags
      if (!product.tags || product.tags.trim() === '') {
        issues.push('No tags');
      }

      return issues.length > 0 ? { ...product.toObject(), issues } : null;
    }).filter(p => p);

    res.status(200).json({
      success: true,
      count: incomplete.length,
      data: incomplete.map(p => ({
        shopifyId: p.shopify_id,
        title: p.title,
        vendor: p.vendor,
        issues: p.issues
      }))
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get enhanced product data for Amazon listing
 */
const getEnhancedProductData = async (req, res) => {
  try {
    const { shopifyId } = req.params;

    const product = await ShopifyProduct.findOne({ shopify_id: shopifyId });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Extract enhanced data
    const cleanDescription = extractTextFromHTML(product.body_html);
    const bullets = extractBulletPoints(product.body_html, product.tags);
    const materialCare = extractMaterialCare(product.body_html);
    const sizeInfo = extractSizeInfo(product.body_html);

    const firstVariant = product.variants?.[0];

    // Build enhanced data suitable for Amazon
    const enhancedData = {
      basic: {
        title: product.title,
        brand: product.vendor,
        sku: firstVariant?.sku || product.shopify_id?.toString(),
        productType: product.product_type
      },
      description: {
        full: cleanDescription.substring(0, 2000), // Amazon limit
        bulletPoint1: bullets[0] || 'High quality product',
        bulletPoint2: bullets[1] || 'Premium materials',
        bulletPoint3: bullets[2] || 'Excellent craftsmanship',
        bulletPoint4: bullets[3] || 'Perfect for daily use',
        bulletPoint5: bullets[4] || 'Great value for money'
      },
      pricing: {
        price: parseFloat(firstVariant?.price) || 0,
        currency: 'INR'
      },
      inventory: {
        quantity: firstVariant?.inventory_quantity || 0
      },
      images: {
        main: product.images?.[0]?.src || null,
        additional: product.images?.slice(1, 6).map(img => img.src) || []
      },
      specifications: {
        material: materialCare.material || 'Premium Quality Material',
        care: materialCare.care || 'Follow care instructions',
        size: sizeInfo
      },
      metadata: {
        tags: product.tags?.split(',').map(t => t.trim()).filter(t => t) || [],
        handle: product.handle,
        shopifyId: product.shopify_id
      }
    };

    res.status(200).json({
      success: true,
      data: enhancedData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  analyzeSingleProduct,
  analyzeAllProducts,
  getIncompleteProducts,
  getEnhancedProductData
};
