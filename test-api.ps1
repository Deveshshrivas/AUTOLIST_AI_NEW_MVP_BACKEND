# PowerShell API Test Script
# Make sure server is running: npm run dev

Write-Host "Testing AutoList AI Backend API" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Test 1: Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:5000/" -Method Get
    Write-Host "✓ Health check passed" -ForegroundColor Green
    $health | ConvertTo-Json
} catch {
    Write-Host "✗ Health check failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Create Item
Write-Host "2. Creating Test Item..." -ForegroundColor Yellow
$createBody = @{
    listingIdentity = @{
        sku = "TEST-SKU-001"
        listingAction = "CREATE"
        productType = "SHIRT"
    }
    productIdentity = @{
        itemName = "Cotton Casual Shirt"
        brandName = "MyBrand"
        productIdType = "EAN"
        productId = "EXT-12345"
    }
    offer = @{
        yourPriceINR = 999
        quantity = 50
    }
    productDescription = @{
        productDescription = "Comfortable cotton shirt for daily wear"
        bulletPoint1 = "100% cotton fabric"
        bulletPoint2 = "Machine washable"
        bulletPoint3 = "Available in multiple colors"
    }
} | ConvertTo-Json -Depth 10

try {
    $createdItem = Invoke-RestMethod -Uri "http://localhost:5000/api/items" -Method Post -Body $createBody -ContentType "application/json"
    Write-Host "✓ Item created successfully" -ForegroundColor Green
    $itemId = $createdItem._id
    Write-Host "Item ID: $itemId" -ForegroundColor Cyan
    $createdItem | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✗ Create failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Get All Items
Write-Host "3. Getting All Items..." -ForegroundColor Yellow
try {
    $allItems = Invoke-RestMethod -Uri "http://localhost:5000/api/items" -Method Get
    Write-Host "✓ Retrieved $($allItems.count) items" -ForegroundColor Green
    $allItems | ConvertTo-Json -Depth 5
} catch {
    Write-Host "✗ Get all items failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: Get Item by SKU
Write-Host "4. Getting Item by SKU..." -ForegroundColor Yellow
try {
    $itemBySku = Invoke-RestMethod -Uri "http://localhost:5000/api/items/sku/TEST-SKU-001" -Method Get
    Write-Host "✓ Item found by SKU" -ForegroundColor Green
    $itemBySku | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✗ Get by SKU failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 5: Search Items
Write-Host "5. Searching Items..." -ForegroundColor Yellow
try {
    $searchResults = Invoke-RestMethod -Uri "http://localhost:5000/api/items/search?q=cotton" -Method Get
    Write-Host "✓ Search returned $($searchResults.count) results" -ForegroundColor Green
    $searchResults | ConvertTo-Json -Depth 5
} catch {
    Write-Host "✗ Search failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 6: Update Item (if we have an ID)
if ($itemId) {
    Write-Host "6. Updating Item..." -ForegroundColor Yellow
    $updateBody = @{
        offer = @{
            yourPriceINR = 899
            quantity = 75
        }
    } | ConvertTo-Json -Depth 10

    try {
        $updatedItem = Invoke-RestMethod -Uri "http://localhost:5000/api/items/$itemId" -Method Put -Body $updateBody -ContentType "application/json"
        Write-Host "✓ Item updated successfully" -ForegroundColor Green
        $updatedItem | ConvertTo-Json -Depth 10
    } catch {
        Write-Host "✗ Update failed: $_" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 7: Filter by Price Range
Write-Host "7. Filtering by Price Range..." -ForegroundColor Yellow
try {
    $priceFilter = Invoke-RestMethod -Uri "http://localhost:5000/api/items/filter/price?min=500&max=1500" -Method Get
    Write-Host "✓ Price filter returned $($priceFilter.count) items" -ForegroundColor Green
    $priceFilter | ConvertTo-Json -Depth 5
} catch {
    Write-Host "✗ Price filter failed: $_" -ForegroundColor Red
}
Write-Host ""

# Test 8: Shopify - Create Product
Write-Host "8. Creating Shopify Product..." -ForegroundColor Yellow
$shopifyBody = @{
    shopify_id = 9876543210
    title = "Shopify Test Product"
    body_html = "<p>Test product description</p>"
    vendor = "TestVendor"
    product_type = "Shirt"
    status = "active"
    tags = "test, cotton, casual"
    variants = @(
        @{
            price = "999.00"
            sku = "SHOPIFY-SKU-001"
            inventory_quantity = 100
            option1 = "Medium"
            option2 = "Blue"
        }
    )
} | ConvertTo-Json -Depth 10

try {
    $shopifyProduct = Invoke-RestMethod -Uri "http://localhost:5000/api/shopify/products" -Method Post -Body $shopifyBody -ContentType "application/json"
    Write-Host "✓ Shopify product created" -ForegroundColor Green
    $shopifyProduct | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✗ Shopify create failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "=================================" -ForegroundColor Green
Write-Host "API Testing Complete!" -ForegroundColor Green
