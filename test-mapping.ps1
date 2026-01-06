# Shopify to Amazon Mapping Test Script

Write-Host "Testing Shopify to Amazon Mapping" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green
Write-Host ""

# First, create a Shopify product
Write-Host "1. Creating Shopify Product..." -ForegroundColor Yellow
$shopifyBody = @{
    shopify_id = 1111111111
    title = "Premium Cotton T-Shirt"
    body_html = "<p>High quality cotton t-shirt for everyday wear</p>"
    vendor = "Fashion Brand"
    product_type = "T-Shirt"
    status = "active"
    handle = "premium-cotton-tshirt"
    tags = "cotton, casual, premium"
    variants = @(
        @{
            price = "1299.00"
            sku = "COTTON-TS-001"
            inventory_quantity = 50
            option1 = "Large"
            option2 = "Blue"
        }
    )
    images = @(
        @{
            src = "https://example.com/image1.jpg"
            position = 1
        },
        @{
            src = "https://example.com/image2.jpg"
            position = 2
        }
    )
} | ConvertTo-Json -Depth 10

try {
    $shopifyProduct = Invoke-RestMethod -Uri "http://localhost:5000/api/shopify/products" -Method Post -Body $shopifyBody -ContentType "application/json"
    Write-Host "✓ Shopify product created" -ForegroundColor Green
    $shopifyId = $shopifyProduct.data.shopify_id
    Write-Host "Shopify ID: $shopifyId" -ForegroundColor Cyan
} catch {
    Write-Host "✗ Create failed: $_" -ForegroundColor Red
    exit
}
Write-Host ""

# Preview mapping
Write-Host "2. Preview Mapping (without saving)..." -ForegroundColor Yellow
try {
    $preview = Invoke-RestMethod -Uri "http://localhost:5000/api/shopify/products/map/preview/$shopifyId" -Method Get
    Write-Host "✓ Preview generated" -ForegroundColor Green
    Write-Host "Default Value: $($preview.defaultValue)" -ForegroundColor Cyan
    $preview | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✗ Preview failed: $_" -ForegroundColor Red
}
Write-Host ""

# Sync single product
Write-Host "3. Sync Single Product to Amazon Items..." -ForegroundColor Yellow
try {
    $syncResult = Invoke-RestMethod -Uri "http://localhost:5000/api/shopify/products/map/$shopifyId" -Method Post
    Write-Host "✓ Product synced successfully" -ForegroundColor Green
    $syncResult | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✗ Sync failed: $_" -ForegroundColor Red
}
Write-Host ""

# Verify in Amazon items
Write-Host "4. Verify in Amazon Items..." -ForegroundColor Yellow
try {
    $amazonItems = Invoke-RestMethod -Uri "http://localhost:5000/api/items" -Method Get
    Write-Host "✓ Amazon items retrieved" -ForegroundColor Green
    Write-Host "Total items: $($amazonItems.totalItems)" -ForegroundColor Cyan
    $amazonItems | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✗ Verification failed: $_" -ForegroundColor Red
}
Write-Host ""

# Sync all products
Write-Host "5. Sync All Shopify Products..." -ForegroundColor Yellow
try {
    $syncAll = Invoke-RestMethod -Uri "http://localhost:5000/api/shopify/products/map-all" -Method Post
    Write-Host "✓ All products synced" -ForegroundColor Green
    Write-Host "Total: $($syncAll.data.total)" -ForegroundColor Cyan
    Write-Host "Created: $($syncAll.data.created)" -ForegroundColor Green
    Write-Host "Updated: $($syncAll.data.updated)" -ForegroundColor Yellow
    Write-Host "Failed: $($syncAll.data.failed)" -ForegroundColor Red
    $syncAll | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✗ Sync all failed: $_" -ForegroundColor Red
}
Write-Host ""

Write-Host "===================================" -ForegroundColor Green
Write-Host "Mapping Test Complete!" -ForegroundColor Green
