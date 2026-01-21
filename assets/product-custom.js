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
