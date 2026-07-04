class MainView{
    constructor() {
        this.emptyState = document.getElementById('mainEmpty');
        this.mainHead = document.getElementById('mainHead');
        this.mainBody = document.getElementById('mainBody');

        this.chatLog = document.getElementById('chatLog');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendBtn');

        this.sendBtn.addEventListener('click', () => this.handleSend());
        this.chatInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') this.handleSend();
        });
    }

    bindEvents(onSendMessage) {
        this.onSendMessage = onSendMessage;
    }

    handleSend(){
        const text = this.chatInput.value.trim();
        if (text) {
            this.onSendMessage(text);
            this.chatInput.value = '';
        }
    }

    showEmpty(){
        this.emptyState.classList.add('show');
        this.mainHead.classList.add('hidden');
        this.mainBody.classList.add('hidden');
    }

    renderCard(user, isSelf, groups, wishList, chatMessages, allUsers) {
        this.emptyState.classList.remove('show');
        this.mainHead.classList.remove('hidden');
        this.mainBody.classList.remove('hidden');

        document.getElementById('mAv').textContent = getInitials(user.name);
        document.getElementById('iAv').textContent = getInitials(user.name);
        document.getElementById('mName').textContent = user.name;
        document.getElementById('iName').textContent = user.name;
        document.getElementById('mBirth').textContent = formatBirthday(user.birthday);

        const daysLeft = getDaysLeft(user.birthday);
        const cdText = daysLeft === 0 ? 'День рождения СЕГОДНЯ!' : `Осталось дней: ${daysLeft}`;
        document.getElementById('mCd').textContent = cdText;
        document.getElementById('iCd').textContent = cdText;
        document.getElementById('mCd').className = `cd ${daysLeft === 0 ? 'today' : ''}`;

        document.getElementById('iGroups').innerHTML = groups.length
            ? groups.map(g => `<div class="chip">${g.name}</div>`).join('')
            : '<span class="info-label">Нет групп</span>';

        document.getElementById('iWish').innerHTML = wishlist.length
            ? wishlist.map(w => `<div class="wish-item">🎁 ${w.itemName}</div>`).join('')
            : '<span class="info-label">Пока пусто</span>';

        const chatSection = document.querySelector('.chat');
        if (isSelf) {
            chatSection.innerHTML = `
                <div class="main-empty show">
                    <div class="main-empty-icon">🤫</div>
                    <div class="main-empty-title">Секретный чат скрыт</div>
                    <div class="main-empty-text">Вы не можете видеть, как друзья обсуждают ваш подарок.</div>
                </div>`;
        } else {
            if (!chatSection.querySelector('.chat-log')) {
                chatSection.innerHTML = `
                    <div class="chat-head"><b>Секретный чат</b></div>
                    <div class="chat-log" id="chatLog"></div>
                    <div class="chat-input-wrap">
                        <div class="chat-input">
                            <input id="chatInput" placeholder="Написать сообщение…">
                            <button class="send" id="sendBtn"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg></button>
                        </div>
                    </div>`;
                this.chatLog = document.getElementById('chatLog');
                this.chatInput = document.getElementById('chatInput');
                document.getElementById('sendBtn').addEventListener('click', () => this.handleSend());
                this.chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') this.handleSend(); });
            }

            this.chatLog.innerHTML = chatMessages.map(m => {
                const sender = allUsers.find(u => u.id === m.senderId);
                const isMine = m.senderId === currentUserId;
                return `
                    <div class="msg ${isMine ? 'mine' : ''}">
                        ${!isMine ? `<div class="msg-sender">${sender ? sender.name : 'Аноним'}</div>` : ''}
                        <div class="bubble">${m.text}</div>
                    </div>`;
            }).join('');
            this.chatLog.scrollTop = this.chatLog.scrollHeight;
        }
    }
}