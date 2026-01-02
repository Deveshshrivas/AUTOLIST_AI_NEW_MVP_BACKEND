# Amazon Listing API Endpoints

Base URL: `http://localhost:5000/api`

## 📋 Item CRUD Operations

### 1. Get All Items (with filters)
```http
GET /api/items
```

**Query Parameters:**
- `status` - Filter by status (active, inactive, draft)
- `brandName` - Filter by brand name (case-insensitive)
- `productType` - Filter by product type
- `vendor` - Filter by country of origin
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort order: asc/desc (default: desc)

**Example:**
```bash
curl "http://localhost:5000/api/items?status=active&page=1&limit=10"
```

### 2. Get Item by ID
```http
GET /api/items/:id
```

**Example:**
```bash
curl http://localhost:5000/api/items/507f1f77bcf86cd799439011
```

### 3. Get Item by SKU
```http
GET /api/items/sku/:sku
```

**Example:**
```bash
curl http://localhost:5000/api/items/sku/SKU12345
```

### 4. Create Item
```http
POST /api/items
```

**Body:** Full item object with all sections (A-P)

**Example:**
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "listingIdentity": {
      "sku": "TEST-SKU-001",
      "listingAction": "CREATE",
      "productType": "Dress material"
    },
    "productIdentity": {
      "itemName": "Test Product",
      "brandName": "Test Brand",
      "productIdType": "EAN",
      "productId": "1234567890123"
    },
    "offer": {
      "quantity": 10,
      "yourPriceINR": 2999
    },
    "complianceRegulatory": {
      "countryOfOrigin": "IN"
    },
    "images": {
      "mainImageURL": "https://example.com/image.jpg"
    }
  }'
```

### 5. Update Item
```http
PUT /api/items/:id
```

**Body:** Updated item object

**Example:**
```bash
curl -X PUT http://localhost:5000/api/items/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"offer": {"yourPriceINR": 3499}}'
```

### 6. Delete Item
```http
DELETE /api/items/:id
```

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/items/507f1f77bcf86cd799439011
```

## 🔍 Search & Filter Operations

### 7. Search Items
```http
GET /api/items/search?q=keyword
```

**Query Parameters:**
- `q` - Search query (required)
- `page` - Page number
- `limit` - Items per page

**Example:**
```bash
curl "http://localhost:5000/api/items/search?q=cotton&page=1&limit=10"
```

### 8. Get Items by Status
```http
GET /api/items/status/:status
```

**Example:**
```bash
curl http://localhost:5000/api/items/status/active
```

### 9. Update Item Status
```http
PATCH /api/items/:id/status
```

**Body:**
```json
{
  "status": "active"
}
```

**Example:**
```bash
curl -X PATCH http://localhost:5000/api/items/507f1f77bcf86cd799439011/status \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

## 📦 Section-Specific Operations

### 10. Get Specific Section
```http
GET /api/items/:id/:section
```

**Sections:** listingIdentity, productIdentity, offer, productDescription, targetAudience, sizeSystem, materialFabric, colorStyle, itemDimensions, occasion, packageShipping, variations, complianceRegulatory, contactDetails, images, miscOptional

**Example:**
```bash
curl http://localhost:5000/api/items/507f1f77bcf86cd799439011/offer
```

### 11. Update Specific Section
```http
PATCH /api/items/:id/:section
```

**Body:** Section data

**Example:**
```bash
curl -X PATCH http://localhost:5000/api/items/507f1f77bcf86cd799439011/offer \
  -H "Content-Type: application/json" \
  -d '{
    "yourPriceINR": 3999,
    "salePriceINR": 3499,
    "quantity": 15
  }'
```

## 🔄 Bulk Operations

### 12. Bulk Create Items
```http
POST /api/items/bulk
```

**Body:**
```json
{
  "items": [
    { "listingIdentity": {...}, "productIdentity": {...} },
    { "listingIdentity": {...}, "productIdentity": {...} }
  ]
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/items/bulk \
  -H "Content-Type: application/json" \
  -d @items.json
```

### 13. Bulk Update Items
```http
PUT /api/items/bulk-update
```

**Body:**
```json
{
  "updates": [
    {
      "id": "507f1f77bcf86cd799439011",
      "data": { "status": "active" }
    },
    {
      "id": "507f1f77bcf86cd799439012",
      "data": { "status": "inactive" }
    }
  ]
}
```

### 14. Bulk Delete Items
```http
DELETE /api/items/bulk-delete
```

**Body:**
```json
{
  "ids": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012"
  ]
}
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "count": 10,
  "totalPages": 5,
  "currentPage": 1,
  "totalItems": 50,
  "data": [...]
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message here"
}
```

## 🗂️ Amazon Listing Schema Sections

- **A. listingIdentity** - SKU, Listing Action, Product Type
- **B. productIdentity** - Item Name, Brand, Product ID, Browse Nodes
- **C. offer** - Price, Quantity, Condition, Fulfillment
- **D. productDescription** - Description, Bullet Points, Style
- **E. targetAudience** - Department, Gender, Age Range
- **F. sizeSystem** - Apparel & Shirt Size Information
- **G. materialFabric** - Materials, Fabric Type, Embellishments
- **H. colorStyle** - Color, Back/Neck Styles, Sleeve Type
- **I. itemDimensions** - Length, Chest Size, Pockets
- **J. occasion** - Occasions (1-5)
- **K. packageShipping** - Package Dimensions & Weight
- **L. variations** - Parent-Child Relationships
- **M. complianceRegulatory** - Country of Origin, Regulations, HSN
- **N. contactDetails** - Manufacturer, Importer, Packer Info
- **O. images** - Main & Additional Image URLs
- **P. miscOptional** - Team Name, Unit Count, Included Components
