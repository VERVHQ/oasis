class ProductCustomGallery extends HTMLElement {
    constructor() {
        super();
        this.thumbnails = this.querySelectorAll('.product-custom__thumbnail');
        this.mainImageWrapper = this.querySelector('.product-custom__main-image-wrapper');
        this.mainImage = this.querySelector('.product-custom__main-image');
    }

    connectedCallback() {
        this.thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => this.updateMainImage(thumbnail));
        });

        // Zoom preview on hover
        if (this.mainImageWrapper && this.mainImage) {
            this.mainImageWrapper.addEventListener('mousemove', (e) => this.handleZoomMove(e));
            this.mainImageWrapper.addEventListener('mouseleave', () => this.handleZoomLeave());
        }
    }

    updateMainImage(thumbnail) {
        const newSrc = thumbnail.dataset.targetSrc;
        const newAlt = thumbnail.dataset.targetAlt;
        if (this.mainImage) {
            this.mainImage.src = newSrc;
            this.mainImage.alt = newAlt;
        }
        this.thumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
    }

    handleZoomMove(e) {
        const rect = this.mainImageWrapper.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        this.mainImage.style.transformOrigin = `${x}% ${y}%`;
    }

    handleZoomLeave() {
        this.mainImage.style.transformOrigin = 'center center';
    }
}

customElements.define('product-custom-gallery', ProductCustomGallery);

class ProductTabs extends HTMLElement {
    constructor() {
        super();
        this.buttons = this.querySelectorAll('.product-tabs__btn');
        this.panes = this.querySelectorAll('.product-tabs__pane');
    }

    connectedCallback() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.switchTab(button));
        });
    }

    switchTab(button) {
        const targetId = button.dataset.targetId;

        this.buttons.forEach(btn => btn.classList.remove('active'));
        this.panes.forEach(pane => pane.classList.remove('active'));

        button.classList.add('active');
        const targetPane = this.querySelector(`#${targetId}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    }
}

customElements.define('product-tabs', ProductTabs);

class LiveViewerCount extends HTMLElement {
    constructor() {
        super();
        this.countElement = this.querySelector('.viewer-count');
        this.min = parseInt(this.dataset.min) || 10;
        this.max = parseInt(this.dataset.max) || 20;
        this.updateInterval = parseInt(this.dataset.interval) * 1000 || 5000;
    }

    connectedCallback() {
        this.startUpdates();
    }

    startUpdates() {
        setInterval(() => {
            this.updateCount();
        }, this.updateInterval);
    }

    updateCount() {
        let currentCount = parseInt(this.countElement.textContent);
        // Randomly decide to add or subtract, but bias towards keeping it in range
        const change = Math.random() > 0.5 ? 1 : -1;
        let newCount = currentCount + change;

        // Clamp between min and max
        if (newCount < this.min) newCount = this.min + 1;
        if (newCount > this.max) newCount = this.max - 1;

        // Add some "jitter" (sometimes change by 2 or 3)
        if (Math.random() > 0.8) {
            newCount += (Math.random() > 0.5 ? 2 : -2);
        }

        // Hard clamp
        newCount = Math.max(this.min, Math.min(newCount, this.max));

        this.countElement.textContent = newCount;

        // Optional: Add a subtle flash effect
        this.countElement.style.opacity = 0.7;
        setTimeout(() => {
            this.countElement.style.opacity = 1;
        }, 300);
    }
}

customElements.define('live-viewer-count', LiveViewerCount);

// Back in Stock Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const notifyBtns = document.querySelectorAll('.js-notify-me-trigger');
    const modal = document.getElementById('BackInStockModal');

    if (modal) {
        const closeBtn = modal.querySelector('.bis-modal__close');
        const overlay = modal.querySelector('.bis-modal__overlay');

        function openModal() {
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        }

        notifyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);

        // Check for success message in URL (standard Shopify form behavior)
        if (window.location.search.includes('contact_posted=true')) {
            const successMsg = modal.querySelector('.bis-modal__success');
            if (successMsg) {
                openModal();
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }
});
