/**
 * AISSA - Chat Manager
 * Handles conversation flow and message rendering
 */

class ChatManager {
    constructor() {
        this.messages = [];
        this.currentSession = null;
        this.isTyping = false;
        this.init();
    }

    init() {
        this.messagesContainer = document.getElementById('chatMessages');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        // Load chat history if exists
        this.loadChatHistory();
    }

    async sendMessage(content) {
        // Add user message
        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: content,
            timestamp: new Date().toISOString()
        };
        
        this.addMessage(userMessage);
        
        // Show typing indicator
        this.showTyping();
        
        try {
            // Call API
            const response = await window.apiService.sendChatMessage(content);
            
            // Hide typing
            this.hideTyping();
            
            // Add assistant response
            const assistantMessage = {
                id: Date.now() + 1,
                role: 'assistant',
                content: response.message,
                timestamp: new Date().toISOString(),
                products: response.products,
                comparison: response.comparison,
                intent: response.intent
            };
            
            this.addMessage(assistantMessage);
            
            // Render products if included
            if (response.products && response.products.length > 0) {
                this.renderProductSuggestions(response.products, assistantMessage.id);
            }
            
        } catch (error) {
            this.hideTyping();
            this.addMessage({
                id: Date.now() + 1,
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date().toISOString(),
                isError: true
            });
        }
    }

    addMessage(message) {
        this.messages.push(message);
        this.renderMessage(message);
        this.saveChatHistory();
        this.scrollToBottom();
    }

    renderMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${message.role} animate-fade-in`;
        messageEl.dataset.messageId = message.id;
        
        const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const avatarIcon = message.role === 'user' ? 'user' : 'bot';
        
        messageEl.innerHTML = `
            <div class="message-avatar">
                <i data-lucide="${avatarIcon}"></i>
            </div>
            <div class="message-content">
                <div class="message-bubble ${message.isError ? 'error' : ''}">
                    ${this.formatMessageContent(message.content)}
                </div>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        this.messagesContainer.appendChild(messageEl);
        
        // Initialize icons in new message
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ nodes: [messageEl] });
        }
    }

    formatMessageContent(content) {
        // Convert URLs to links
        content = content.replace(
            /(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank" rel="noopener">$1</a>'
        );
        
        // Convert **bold** to <strong>
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert *italic* to <em>
        content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        return content;
    }

    renderProductSuggestions(products, messageId) {
        const messageEl = this.messagesContainer.querySelector(`[data-message-id="${messageId}"]`);
        if (!messageEl) return;
        
        const suggestionsEl = document.createElement('div');
        suggestionsEl.className = 'product-suggestions';
        
        products.forEach(product => {
            const discount = product.price.original 
                ? Math.round((1 - product.price.current / product.price.original) * 100)
                : 0;
            
            const productCard = document.createElement('div');
            productCard.className = 'product-card animate-slide-in';
            productCard.innerHTML = `
                <div class="product-card-header">
                    <div class="product-image">
                        ${product.images[0] 
                            ? `<img src="${product.images[0]}" alt="${product.name}" loading="lazy">`
                            : `<i data-lucide="package" class="product-image-placeholder"></i>`
                        }
                    </div>
                    <div class="product-info">
                        <h4 class="product-name">${product.name}</h4>
                        <p class="product-brand">${product.brand}</p>
                        <div class="product-price-row">
                            <span class="product-price">₹${product.price.current.toLocaleString()}</span>
                            ${product.price.original ? `
                                <span class="product-original-price">₹${product.price.original.toLocaleString()}</span>
                            ` : ''}
                            ${discount > 0 ? `
                                <span class="product-discount">${discount}% off</span>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="product-card-footer">
                    <div class="product-rating">
                        <div class="rating-stars">
                            ${this.renderStars(product.rating)}
                        </div>
                        <span class="rating-value">${product.rating}</span>
                        <span class="rating-count">(${product.reviewCount})</span>
                    </div>
                    <div class="product-platform">
                        <span>${product.source}</span>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="product-btn" onclick="chatManager.addToWishlist('${product.id}')">
                        <i data-lucide="heart"></i>
                        <span>Save</span>
                    </button>
                    <button class="product-btn product-btn-primary" onclick="window.open('${product.url}', '_blank')">
                        <i data-lucide="external-link"></i>
                        <span>View Deal</span>
                    </button>
                </div>
                ${product.sustainabilityScore ? `
                    <div style="padding: 0 var(--space-3) var(--space-3);">
                        <span class="sustainability-badge">
                            <i data-lucide="leaf"></i>
                            Eco Score: ${product.sustainabilityScore}/100
                        </span>
                    </div>
                ` : ''}
            `;
            
            suggestionsEl.appendChild(productCard);
        });
        
        // Add compare button if multiple products
        if (products.length > 1) {
            const compareBtn = document.createElement('button');
            compareBtn.className = 'btn btn-primary';
            compareBtn.style.marginTop = 'var(--space-3)';
            compareBtn.innerHTML = `
                <i data-lucide="git-compare"></i>
                <span>Compare All (${products.length})</span>
            `;
            compareBtn.onclick = () => this.showComparison(products);
            suggestionsEl.appendChild(compareBtn);
        }
        
        messageEl.querySelector('.message-content').appendChild(suggestionsEl);
        
        // Initialize icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons({ nodes: [suggestionsEl] });
        }
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i data-lucide="star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i data-lucide="star-half"></i>';
        }
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
            stars += '<i data-lucide="star" style="opacity: 0.3;"></i>';
        }
        
        return stars;
    }

    showComparison(products) {
        window.app.switchView('comparison');
        window.productManager.renderComparison(products);
    }

    addToWishlist(productId) {
        window.productManager.addToWishlist(productId);
    }

    showTyping() {
        this.isTyping = true;
        this.typingIndicator.classList.remove('hidden');
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        this.typingIndicator.classList.add('hidden');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 100);
    }

    saveChatHistory() {
        localStorage.setItem('aissa_chat_history', JSON.stringify(this.messages));
    }

    loadChatHistory() {
        const history = localStorage.getItem('aissa_chat_history');
        if (history) {
            this.messages = JSON.parse(history);
            this.messages.forEach(msg => this.renderMessage(msg));
        }
    }

    clearHistory() {
        this.messages = [];
        this.messagesContainer.innerHTML = '';
        localStorage.removeItem('aissa_chat_history');
    }
}

// Initialize chat manager
window.chatManager = new ChatManager();
