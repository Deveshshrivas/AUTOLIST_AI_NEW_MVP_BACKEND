# API Testing with cURL Commands

Base URL: `http://localhost:5000`

## Amazon Listing API Tests

### Health Check
```bash
curl http://localhost:5000/
curl http://localhost:5000/api/test
```

### CRUD Operations

#### Create Item
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "listingIdentity": {
      "sku": "TEST-SKU-001",
      "listingAction": "create",
      "productType": "SHIRT"
    },
    "productIdentity": {
      "itemName": "Cotton Casual Shirt",
      "brand": "MyBrand",
      "externalProductId": "EXT-12345",
      "externalProductIdType": "EAN"
    },
    "offer": {
      "standardPrice": 999,
      "quantity": 50,
      "currency": "INR",
      "fulfillmentCenterChannelId": "DEFAULT"
    },
    "productDescription": {
      "productDescription": "Comfortable cotton shirt for daily wear",
      "bulletPoint1": "100% cotton fabric",
      "bulletPoint2": "Machine washable",
      "bulletPoint3": "Available in multiple colors"
    }
  }'
```

#### Get All Items
```bash
curl http://localhost:5000/api/items
```

#### Get All Items with Filters
```bash
# Filter by status
curl "http://localhost:5000/api/items?status=active"

# Filter by brand
curl "http://localhost:5000/api/items?brand=MyBrand"

# Filter by product type
curl "http://localhost:5000/api/items?productType=SHIRT"

# Pagination
curl "http://localhost:5000/api/items?page=1&limit=10"

# Sorting
curl "http://localhost:5000/api/items?sortBy=createdAt&order=desc"

# Price range
curl "http://localhost:5000/api/items?minPrice=500&maxPrice=2000"

# Combined filters
curl "http://localhost:5000/api/items?status=active&brand=MyBrand&page=1&limit=10&sortBy=offer.standardPrice&order=asc"
```

#### Get Item by ID
```bash
curl http://localhost:5000/api/items/YOUR_ITEM_ID
```

#### Get Item by SKU
```bash
curl http://localhost:5000/api/items/sku/TEST-SKU-001
```

#### Update Item
```bash
curl -X PUT http://localhost:5000/api/items/YOUR_ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "offer": {
      "standardPrice": 899,
      "quantity": 75
    },
    "productDescription": {
      "productDescription": "Updated description - Premium cotton shirt"
    }
  }'
```

#### Delete Item
```bash
curl -X DELETE http://localhost:5000/api/items/YOUR_ITEM_ID
```

### Search & Filter Operations

#### Search Items (Text Search)
```bash
curl "http://localhost:5000/api/items/search?q=cotton"
curl "http://localhost:5000/api/items/search?q=shirt"
```

#### Get Items by Status
```bash
curl http://localhost:5000/api/items/status/active
curl http://localhost:5000/api/items/status/inactive
curl http://localhost:5000/api/items/status/pending
```

#### Update Item Status
```bash
curl -X PATCH http://localhost:5000/api/items/YOUR_ITEM_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

#### Filter by Price Range
```bash
curl "http://localhost:5000/api/items/filter/price?min=500&max=1500"
```

#### Filter by Brand
```bash
curl http://localhost:5000/api/items/filter/brand/MyBrand
```

### Bulk Operations

#### Bulk Create Items
```bash
curl -X POST http://localhost:5000/api/items/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "listingIdentity": {
          "sku": "BULK-SKU-001",
          "listingAction": "create",
          "productType": "SHIRT"
        },
        "productIdentity": {
          "itemName": "Bulk Item 1",
          "brand": "BulkBrand"
        },
        "offer": {
          "standardPrice": 599,
          "quantity": 100
        }
      },
      {
        "listingIdentity": {
          "sku": "BULK-SKU-002",
          "listingAction": "create",
          "productType": "SHIRT"
        },
        "productIdentity": {
          "itemName": "Bulk Item 2",
          "brand": "BulkBrand"
        },
        "offer": {
          "standardPrice": 799,
          "quantity": 150
        }
      }
    ]
  }'
```

#### Bulk Update Items
```bash
curl -X PUT http://localhost:5000/api/items/bulk-update \
  -H "Content-Type: application/json" \
  -d '{
    "updates": [
      {
        "id": "ITEM_ID_1",
        "data": {
          "offer": {
            "standardPrice": 699
          }
        }
      },
      {
        "id": "ITEM_ID_2",
        "data": {
          "offer": {
            "standardPrice": 899
          }
        }
      }
    ]
  }'
```

#### Bulk Delete Items
```bash
curl -X DELETE http://localhost:5000/api/items/bulk-delete \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["ITEM_ID_1", "ITEM_ID_2", "ITEM_ID_3"]
  }'
```

#### Bulk Update Status
```bash
curl -X PATCH http://localhost:5000/api/items/bulk-status \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["ITEM_ID_1", "ITEM_ID_2"],
    "status": "active"
  }'
```

### Section-Specific Operations

#### Get Specific Section
```bash
curl http://localhost:5000/api/items/YOUR_ITEM_ID/listingIdentity
curl http://localhost:5000/api/items/YOUR_ITEM_ID/productIdentity
curl http://localhost:5000/api/items/YOUR_ITEM_ID/offer
curl http://localhost:5000/api/items/YOUR_ITEM_ID/images
curl http://localhost:5000/api/items/YOUR_ITEM_ID/compliance
```

#### Update Listing Identity
```bash
curl -X PATCH http://localhost:5000/api/items/YOUR_ITEM_ID/listing-identity \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "UPDATED-SKU-001",
    "listingAction": "update"
  }'
```

#### Update Product Identity
```bash
curl -X PATCH http://localhost:5000/api/items/YOUR_ITEM_ID/product-identity \
  -H "Content-Type: application/json" \
  -d '{
    "itemName": "Updated Product Name",
    "brand": "UpdatedBrand"
  }'
```

#### Update Offer
```bash
curl -X PATCH http://localhost:5000/api/items/YOUR_ITEM_ID/offer \
  -H "Content-Type: application/json" \
  -d '{
    "standardPrice": 1099,
    "quantity": 200,
    "salePrice": 999
  }'
```

#### Update Images
```bash
curl -X PATCH http://localhost:5000/api/items/YOUR_ITEM_ID/images \
  -H "Content-Type: application/json" \
  -d '{
    "mainImageUrl": "https://example.com/main.jpg",
    "otherImageUrl1": "https://example.com/img1.jpg",
    "otherImageUrl2": "https://example.com/img2.jpg"
  }'
```

#### Update Compliance
```bash
curl -X PATCH http://localhost:5000/api/items/YOUR_ITEM_ID/compliance \
  -H "Content-Type: application/json" \
  -d '{
    "countryOfOrigin": "India",
    "hsnCode": "6205"
  }'
```

#### Generic Section Update
```bash
curl -X PATCH http://localhost:5000/api/items/YOUR_ITEM_ID/productDescription \
  -H "Content-Type: application/json" \
  -d '{
    "productDescription": "New description",
    "bulletPoint1": "Updated bullet 1",
    "bulletPoint2": "Updated bullet 2"
  }'
```

---

## Shopify Products API Tests

### CRUD Operations

#### Create Product
```bash
curl -X POST http://localhost:5000/api/shopify/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Shopify Test Product",
    "body_html": "<p>Test product description</p>",
    "vendor": "TestVendor",
    "product_type": "Shirt",
    "status": "active",
    "tags": ["test", "cotton", "casual"],
    "variants": [
      {
        "price": "999.00",
        "sku": "SHOPIFY-SKU-001",
        "inventory_quantity": 100,
        "option1": "Medium",
        "option2": "Blue"
      }
    ],
    "options": [
      {
        "name": "Size",
        "values": ["Small", "Medium", "Large"]
      },
      {
        "name": "Color",
        "values": ["Blue", "Red", "Green"]
      }
    ],
    "images": [
      {
        "src": "https://example.com/shopify-product.jpg",
        "position": 1
      }
    ]
  }'
```

#### Get All Products
```bash
curl http://localhost:5000/api/shopify/products
```

#### Get All Products with Filters
```bash
# Filter by status
curl "http://localhost:5000/api/shopify/products?status=active"

# Filter by vendor
curl "http://localhost:5000/api/shopify/products?vendor=TestVendor"

# Filter by product type
curl "http://localhost:5000/api/shopify/products?product_type=Shirt"

# Pagination
curl "http://localhost:5000/api/shopify/products?page=1&limit=10"

# Combined
curl "http://localhost:5000/api/shopify/products?status=active&vendor=TestVendor&page=1&limit=5"
```

#### Get Product by ID
```bash
curl http://localhost:5000/api/shopify/products/YOUR_PRODUCT_ID
```

#### Update Product
```bash
curl -X PUT http://localhost:5000/api/shopify/products/YOUR_PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Product Title",
    "body_html": "<p>Updated description</p>",
    "status": "active"
  }'
```

#### Delete Product
```bash
curl -X DELETE http://localhost:5000/api/shopify/products/YOUR_PRODUCT_ID
```

### Lookup Operations

#### Get by Shopify ID
```bash
curl http://localhost:5000/api/shopify/products/shopify/1234567890
```

#### Get by Handle
```bash
curl http://localhost:5000/api/shopify/products/handle/test-product-handle
```

#### Search Products
```bash
curl "http://localhost:5000/api/shopify/products/search?q=cotton"
curl "http://localhost:5000/api/shopify/products/search?q=shirt"
```

### Sync Operations

#### Bulk Create Products
```bash
curl -X POST http://localhost:5000/api/shopify/products/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {
        "title": "Bulk Product 1",
        "vendor": "BulkVendor",
        "product_type": "Shirt",
        "status": "active",
        "variants": [
          {
            "price": "599.00",
            "sku": "BULK-1",
            "inventory_quantity": 50
          }
        ]
      },
      {
        "title": "Bulk Product 2",
        "vendor": "BulkVendor",
        "product_type": "Shirt",
        "status": "active",
        "variants": [
          {
            "price": "799.00",
            "sku": "BULK-2",
            "inventory_quantity": 75
          }
        ]
      }
    ]
  }'
```

#### Sync Product (Upsert)
```bash
curl -X POST http://localhost:5000/api/shopify/products/sync \
  -H "Content-Type: application/json" \
  -d '{
    "shopify_id": 1234567890,
    "title": "Synced Product",
    "vendor": "SyncVendor",
    "status": "active",
    "variants": [
      {
        "price": "899.00",
        "sku": "SYNC-SKU-001",
        "inventory_quantity": 100
      }
    ]
  }'
```

---

## Windows PowerShell Alternative

If you're using PowerShell on Windows, use `Invoke-WebRequest` or `Invoke-RestMethod`:

### Example GET Request
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/items" -Method Get
```

### Example POST Request
```powershell
$body = @{
    listingIdentity = @{
        sku = "TEST-SKU-001"
        listingAction = "create"
        productType = "SHIRT"
    }
    productIdentity = @{
        itemName = "Test Product"
        brand = "TestBrand"
    }
    offer = @{
        standardPrice = 999
        quantity = 50
    }
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/items" -Method Post -Body $body -ContentType "application/json"
```

---

## Notes

1. Replace `YOUR_ITEM_ID` with actual MongoDB ObjectId from responses
2. Replace `YOUR_PRODUCT_ID` with actual product ID
3. Server must be running on `http://localhost:5000`
4. All timestamps are in ISO 8601 format
5. Response format is JSON
6. MongoDB must be connected for all operations to work

## Quick Test Sequence

```bash
# 1. Test health
curl http://localhost:5000/api/test

# 2. Create an item
curl -X POST http://localhost:5000/api/items -H "Content-Type: application/json" -d '{"listingIdentity":{"sku":"TEST-001","listingAction":"create","productType":"SHIRT"},"productIdentity":{"itemName":"Test Shirt","brand":"TestBrand"},"offer":{"standardPrice":999,"quantity":50}}'

# 3. Get all items
curl http://localhost:5000/api/items

# 4. Search
curl "http://localhost:5000/api/items/search?q=test"

# 5. Get by SKU
curl http://localhost:5000/api/items/sku/TEST-001
```
