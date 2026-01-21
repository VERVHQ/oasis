class ProductCustomGallery extends HTMLElement {
    constructor() {
        super();
        this.thumbnails = this.querySelectorAll('.product-custom__thumbnail');
        this.mainImage = this.querySelector('.product-custom__main-image');

        this.thumbnails.forEach(thumb => {
            thumb.addEventListener('click', this.handleThumbnailClick.bind(this));
        });
    }

    handleThumbnailClick(event) {
        const target = event.currentTarget;
        const newImageSrc = target.dataset.targetSrc;
        const newAlt = target.dataset.targetAlt;

        // Update Main Image
        if (this.mainImage) {
            this.mainImage.style.opacity = '0.5';
            setTimeout(() => {
                this.mainImage.src = newImageSrc;
                this.mainImage.alt = newAlt;
                this.mainImage.style.opacity = '1';
            }, 200);
        }

        // Update Active State
        this.thumbnails.forEach(t => t.classList.remove('active'));
        target.classList.add('active');
    }
}

customElements.define('product-custom-gallery', ProductCustomGallery);

class ProductTabs extends HTMLElement {
    constructor() {
        super();
        this.buttons = this.querySelectorAll('.product-tabs__btn');
        this.panes = this.querySelectorAll('.product-tabs__pane');

        this.buttons.forEach(btn => {
            btn.addEventListener('click', this.handleTabClick.bind(this));
        });
    }

    handleTabClick(event) {
        const target = event.currentTarget;
        const contentId = target.dataset.targetId;

        // Reset all
        this.buttons.forEach(btn => btn.classList.remove('active'));
        this.panes.forEach(pane => pane.classList.remove('active'));

        // Activate target
        target.classList.add('active');
        const targetPane = this.querySelector(`#${contentId}`);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    }
}

customElements.define('product-tabs', ProductTabs);
