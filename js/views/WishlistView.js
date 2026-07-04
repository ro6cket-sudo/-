class WishlistView {
    constructor(wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    render(container, userId, { editable = false } = {}) {
        this.container = container;
        this.userId = userId;
        this.editable = editable;
        this.renderList();
    }

    renderList() {
        const items = this.wishlistRepository.getByUserId(this.userId);

        let html = items.length
            ? items.map(item => this.renderItem(item)).join('')
            : '<div class="wish-empty">Пока пусто</div>';

        if (this.editable) {
            html += `
                <div class="wish-add">
                    <input class="wish-add-input" placeholder="Добавить подарок…" maxlength="80">
                    <button class="wish-add-btn" title="Добавить">+</button>
                </div>
            `;
        }

        this.container.innerHTML = html;

        if (this.editable) this.bindEvents();
    }

    renderItem(item) {
        return `
            <div class="wish-item" data-id="${item.id}">
                <span class="wish-text">${this.escapeHtml(item.itemName)}</span>
                ${this.editable ? '<button class="wish-del" title="Удалить">×</button>' : ''}
            </div>
        `;
    }

    bindEvents() {
        this.container.querySelectorAll('.wish-del').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.closest('.wish-item').dataset.id);
                this.wishlistRepository.delete(id);
                this.renderList();
            });
        });

        const input = this.container.querySelector('.wish-add-input');
        const addBtn = this.container.querySelector('.wish-add-btn');

        const submit = () => {
            const value = input.value.trim();
            if (!value) return;
            this.wishlistRepository.add(this.userId, value);
            this.renderList();
        };

        addBtn.addEventListener('click', submit);
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') submit();
        });
    }

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
