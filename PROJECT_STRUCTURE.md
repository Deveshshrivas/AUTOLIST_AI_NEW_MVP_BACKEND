# Backend Project Structure

## 📁 Controllers Organization

### Amazon Listing Controllers (`controllers/amazon/`)
Organized into 4 focused modules:

#### 1. **crudController.js** - Basic CRUD Operations
- `getAllItems()` - Get all items with advanced filtering
- `getItemById()` - Get single item by MongoDB ID
- `getItemBySku()` - Get item by SKU
- `createItem()` - Create new item
- `updateItem()` - Update entire item
- `deleteItem()` - Delete item

#### 2. **searchController.js** - Search & Filter Operations
- `searchItems()` - Text search across multiple fields
- `getItemsByStatus()` - Filter by status (active/inactive/draft)
- `updateItemStatus()` - Update item status
- `filterByPriceRange()` - Filter by min/max price
- `filterByBrand()` - Filter by brand name

#### 3. **bulkController.js** - Bulk Operations
- `bulkCreateItems()` - Create multiple items at once
- `bulkUpdateItems()` - Update multiple items
- `bulkDeleteItems()` - Delete multiple items by IDs
- `bulkUpdateStatus()` - Update status for multiple items

#### 4. **sectionController.js** - Section-Specific Operations
- `getItemSection()` - Get specific section data
- `updateItemSection()` - Update specific section
- `updateListingIdentity()` - Update listing identity section
- `updateProductIdentity()` - Update product identity section
- `updateOffer()` - Update offer/pricing section
- `updateImages()` - Update images section
- `updateCompliance()` - Update compliance section

**Index File:** `controllers/amazon/index.js` exports all functions from sub-modules

---

### Shopify Controllers (`controllers/shopify/`)
Organized into 3 modules:

#### 1. **crudController.js** - Basic CRUD Operations
- `getAllProducts()` - Get all Shopify products with filters
- `getProductById()` - Get product by MongoDB ID
- `createProduct()` - Create new Shopify product
- `updateProduct()` - Update Shopify product
- `deleteProduct()` - Delete Shopify product

#### 2. **lookupController.js** - Lookup & Search Operations
- `getByShopifyId()` - Get product by Shopify ID
- `getByHandle()` - Get product by handle/slug
- `searchProducts()` - Text search across products

#### 3. **syncController.js** - Sync Operations
- `bulkCreate()` - Bulk create Shopify products
- `syncProduct()` - Upsert product (create or update)

**Index File:** `controllers/shopify/index.js` exports all functions

---

## 📁 Models Organization

### Amazon Listing Model (`models/Item.js`)
Main model that imports all sub-schemas

### Amazon Schema Modules (`models/schemas/`)
16 modular schema files:
1. `listingIdentitySchema.js` - SKU, Listing Action, Product Type
2. `productIdentitySchema.js` - Item Name, Brand, Product ID
3. `offerSchema.js` - Price, Quantity, Condition
4. `productDescriptionSchema.js` - Description, Bullet Points
5. `targetAudienceSchema.js` - Department, Gender, Age
6. `sizeSystemSchema.js` - Size information
7. `materialFabricSchema.js` - Materials & fabric details
8. `colorStyleSchema.js` - Color & style options
9. `itemDimensionsSchema.js` - Physical dimensions
10. `occasionSchema.js` - Occasions for use
11. `packageShippingSchema.js` - Package dimensions
12. `variationsSchema.js` - Parent-child relationships
13. `complianceRegulatorySchema.js` - Compliance & regulations
14. `contactDetailsSchema.js` - Manufacturer/Importer info
15. `imagesSchema.js` - Image URLs
16. `miscOptionalSchema.js` - Optional fields

### Shopify Model (`models/ShopifyDB/ShopifyProduct.js`)
Complete Shopify product schema with nested structures

---

## 📁 Routes

### Amazon Routes (`routes/api.js`)
- Imports from `controllers/amazon/index.js`
- All Amazon listing endpoints
- Organized by operation type

### Shopify Routes (`routes/shopify.js`)
- Imports from `controllers/shopify/index.js`
- All Shopify product endpoints

---

## 🎯 Benefits of This Structure

### ✅ Maintainability
- Each file has a single responsibility
- Easy to locate and update specific functionality
- Clear separation of concerns

### ✅ Readability
- Small, focused files (100-200 lines each)
- Descriptive file names
- Logical grouping of related functions

### ✅ Scalability
- Easy to add new controllers
- Simple to extend existing functionality
- No file becomes too large

### ✅ Testability
- Individual modules can be tested independently
- Mock dependencies easily
- Unit tests are more focused

### ✅ Collaboration
- Multiple developers can work on different modules
- Reduced merge conflicts
- Clear ownership of functionality

---

## 📊 File Structure Overview

```
controllers/
├── amazon/
│   ├── index.js           # Aggregates all exports
│   ├── crudController.js  # Basic CRUD
│   ├── searchController.js # Search & filter
│   ├── bulkController.js   # Bulk operations
│   └── sectionController.js # Section updates
│
├── shopify/
│   ├── index.js           # Aggregates all exports
│   ├── crudController.js  # Basic CRUD
│   ├── lookupController.js # Lookup operations
│   └── syncController.js   # Sync operations
│
├── itemController.js      # (Legacy - can be removed)
└── shopifyController.js   # (Legacy - can be removed)

models/
├── schemas/               # 16 Amazon sub-schemas
│   ├── listingIdentitySchema.js
│   ├── productIdentitySchema.js
│   └── ... (14 more)
│
├── ShopifyDB/
│   └── ShopifyProduct.js
│
└── Item.js               # Main Amazon model

routes/
├── api.js                # Amazon routes
└── shopify.js            # Shopify routes
```

This structure follows industry best practices and makes the codebase professional and maintainable!
