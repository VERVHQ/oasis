class ProductCustomGallery extends HTMLElement {
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
