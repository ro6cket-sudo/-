class ChatView {
    constructor(chatRepository, userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    render(elements, targetUserId, currentUserId) {
        this.logEl = elements.log;
        this.inputEl = elements.input;
        this.sendBtn = elements.sendBtn;
        this.hintEl = elements.hint;
        this.targetUserId = targetUserId;
        this.currentUserId = currentUserId;

        this.renderHint();
        this.renderLog();
        this.bindEvents();
    }

    renderHint() {
        if (!this.hintEl) return;
        const target = this.userRepository.getById(this.targetUserId);
        this.hintEl.textContent = target ? `скрыто от ${target.name}` : '';
    }

    renderLog() {
        const messages = this.chatRepository.getMessagesForUser(this.targetUserId);

        this.logEl.innerHTML = messages.length
            ? messages.map(message => this.renderMessage(message)).join('')
            : '<div class="chat-empty">Сообщений пока нет</div>';

        this.logEl.scrollTop = this.logEl.scrollHeight;
    }

    renderMessage(message) {
        const mine = message.senderId === this.currentUserId;
        const sender = this.userRepository.getById(message.senderId);

        return `
            <div class="msg ${mine ? 'mine' : ''}">
                ${!mine && sender ? `<span class="msg-sender">${this.escapeHtml(sender.name)}</span>` : ''}
                <div class="bubble">${this.escapeHtml(message.text)}</div>
            </div>
        `;
    }

    bindEvents() {
        if (this.submit) {
            this.sendBtn.removeEventListener('click', this.submit);
            this.inputEl.removeEventListener('keydown', this.onKeydown);
        }

        this.submit = () => {
            const text = this.inputEl.value.trim();
            if (!text) return;
            this.chatRepository.addMessage(this.targetUserId, this.currentUserId, text);
            this.inputEl.value = '';
            this.renderLog();
        };

        this.onKeydown = (event) => {
            if (event.key === 'Enter') this.submit();
        };

        this.sendBtn.addEventListener('click', this.submit);
        this.inputEl.addEventListener('keydown', this.onKeydown);
    }

    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
