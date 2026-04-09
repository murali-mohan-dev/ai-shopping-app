/**
 * AISSA - Product Manager
 * Handles product data, wishlist, and comparisons
 */

class ProductManager {
    constructor() {
        this.wishlist = [];
        this.alerts = [];
        this.init();
    }

    init() {
        this.loadWishlist();
        this.loadAlerts();
    }

    // Wishlist Methods
    addToWishlist(product) {
        const exists = this.wishlist.find(item => item.id === product.id);
        if (exists) {
            window.app.showToast('Product already in wishlist', 'warning');
            return;
        }

        const wishlistItem = {
            ...product,
            addedAt: new Date().toISOString(),
            alertEnabled: true,
            targetPrice: null
        };

        this.wishlist.push(wishlistItem);
        this.saveWishlist();
        window.app.showToast('Added to wishlist!', 'success');
        
        // Update UI if on wishlist view
        if (window.app.currentView === 'wishlist') {
            window.app.renderWishlist();
        }
    }

    removeFromWishlist(productId) {
        this.wishlist = this.wishlist.filter(item => item.id !== productId);
        this.saveWishlist();
        window.app.renderWishlist();
        window.app.showToast('Removed from wishlist', 'info');
    }

    toggleAlert(productId) {
        const item = this.wishlist.find(item => item.id === productId);
        if (item) {
            item.alertEnabled = !item.alertEnabled;
            this.saveWishlist();
            window.app.renderWishlist();
        }
    }

    setTargetPrice(productId, price) {
        const item = this.wishlist.find(item => item.id === productId);
        if (item) {
            item.targetPrice = price;
            this.saveWishlist();
        }
    }

    // Comparison Methods
    renderComparison(products) {
        const container = document.getElementById('comparisonContainer');
        container.innerHTML = '';

        // Find best value product
        const bestValue = products.reduce((best, current) => {
            const bestScore = (best.rating * 10) / best.price.current;
            const currentScore = (current.rating * 10) / current.price.current;
            return currentScore > bestScore ? current : best;
        });

        products.forEach((product, index) => {
            const isBestValue = product.id === bestValue.id;
            const discount = product.price.original
                ? Math.round((1 - product.price.current / product.price.original) * 100)
                : 0;

            const card = document.createElement('div');
            card.className = `comparison-card ${isBestValue ? 'featured' : ''}`;
            card.innerHTML = `
                ${isBestValue ? '<div class="badge badge-primary" style="margin: var(--space-3);">Best Value</div>' : ''}
                <div class="comparison-card-header">
                    <div class="comparison-product-image">
                        ${product.images[0]
                            ? `<img src="${product.images[0]}" alt="${product.name}">`
                            : `<i data-lucide="package" style="width: 48px; height: 48px; color: var(--gray-300);"></i>`
                        }
                    </div>
                    <h3 class="comparison-product-name">${product.name}</h3>
                    <p class="comparison-product-brand">${product.brand}</p>
                    <div class="comparison-price">₹${product.price.current.toLocaleString()}</div>
                    ${discount > 0 ? `<span class="badge badge-success">${discount}% OFF</span>` : ''}
                </div>
                <div class="comparison-features">
                    <div class="comparison-feature">
                        <span class="comparison-feature-label">Rating</span>
                        <span class="comparison-feature-value">${product.rating} ★</span>
                    </div>
                    <div class="comparison-feature">
                        <span class="comparison-feature-label">Reviews</span>
                        <span class="comparison-feature-value">${product.reviewCount.toLocaleString()}</span>
                    </div>
                    <div class="comparison-feature">
                        <span class="comparison-feature-label">Platform</span>
                        <span class="comparison-feature-value">${product.source}</span>
                    </div>
                    <div class="comparison-feature">
                        <span class="comparison-feature-label">Availability</span>
                        <span class="comparison-feature-value ${product.availability === 'in_stock' ? 'positive' : 'negative'}">
                            ${product.availability.replace('_', ' ')}
                        </span>
                    </div>
                    ${product.sustainabilityScore ? `
                        <div class="comparison-feature">
                            <span class="comparison-feature-label">Eco Score</span>
                            <span class="comparison-feature-value positive">${product.sustainabilityScore}/100</span>
                        </div>
                    ` : ''}
                </div>
                <div class="product-actions" style="padding: var(--space-4);">
                    <button class="product-btn" onclick="productManager.addToWishlist(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i data-lucide="heart"></i>
                        <span>Save</span>
                    </button>
                    <button class="product-btn product-btn-primary" onclick="window.open('${product.url}', '_blank')">
                        <i data-lucide="external-link"></i>
                        <span>Buy Now</span>
                    </button>
                </div>
            `;
            container.appendChild(card);
        });

        // Add recommendation
        const recommendation = document.createElement('div');
        recommendation.className = 'comparison-recommendation';
        recommendation.innerHTML = `
            <p>💡 Based on price-to-rating ratio, <strong>${bestValue.name}</strong> offers the best value</p>
        `;
        container.lastElementChild.appendChild(recommendation);

        // Initialize icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ nodes: [container] });
        }
    }

    // Storage Methods
    saveWishlist() {
        localStorage.setItem('aissa_wishlist', JSON.stringify(this.wishlist));
    }

    loadWishlist() {
        const saved = localStorage.getItem('aissa_wishlist');
        if (saved) {
            this.wishlist = JSON.parse(saved);
        }
    }

    saveAlerts() {
        localStorage.setItem('aissa_alerts', JSON.stringify(this.alerts));
    }

    loadAlerts() {
        const saved = localStorage.getItem('aissa_alerts');
        if (saved) {
            this.alerts = JSON.parse(saved);
        }
    }
}

// Initialize product manager
window.productManager = new ProductManager();
