class Sidebar {
    constructor() {
        this.railGroups = document.getElementById('railGroups');
        this.railHome = document.getElementById('railHome');
        this.listTitle = document.getElementById('listTitle');
        this.listBody = document.getElementById('listBody');

        this.groupActions = document.getElementById('groupActions');
        this.groupJoinBtn = document.getElementById('groupJoinBtn');
        this.groupBellBtn = document.getElementById('groupBellBtn');

        this.listBody.addEventListener('click', (event) => {
            const friendButton = event.target.closest('.friend');
        })

        this.railHome.addEventListener('click', () => {
            this.onGroupSelect(null)
        })

        this.railGroups.addEventListener('click', (event) => {
            const button = event.target.closest('.rail-btn-group');
            if (button) {
                this.onGroupSelect(Number(button.dataset.id));
            }
        })

        this.groupJoinBtn.addEventListener('click', () => this.onGroupJoin());
        this.groupBellBtn.addEventListener('click', () => this.onGroupSubscribe());
    }

    bindEvents(onUserSelect, onGroupSelect, onGroupJoin, onGroupSubscribe) {
        this.onUserSelect = onUserSelect;
        this.onGroupSelect = onGroupSelect;
        this.onGroupJoin = onGroupJoin;
        this.onGroupSubscribe = onGroupSubscribe;
    }

    renderRail(groups, activeGroupId){
        this.railHome.classlist.toggle('active', activeGroupId === null);
        this.railGroups.innerHTML = groups.map(g => `
            <div class="rail-item">
                ${g.id === activeGroupId ? '<div class="rail-pill"></div>' : ''}
                <button class="rail-btn group ${g.id === activeGroupId ? 'active' : ''}" data-id="${g.id}" title="${g.name}">
                    ${g.name.substring(0, 2).toUpperCase()}
                </button>
            </div>
        `).join('');
    }

    renderList(users, activeUserId, activeGroup, isSubscribedToGroup, isMember, upcoming) {
        this.listTitle.textContent = activeGroup ? activeGroup.name : 'Все друзья';

        if (activeGroup) {
            this.groupActions.classList.add('show');
            this.groupJoinBtn.textContent = isMember ? 'Выйти из группы' : 'Вступить';
            this.groupJoinBtn.className = `ga-btn ${isMember ? 'joined' : ''}`;
            this.groupBellBtn.className = `ga-bell ${isSubscribedToGroup ? 'active' : ''}`;
        } else {
            this.groupActions.classList.remove('show');
        }

        let html = '';

        if (upcoming && upcoming.length > 0) {
            html += `<div class="section-label">БЛИЖАЙШИЕ ПРАЗДНИКИ</div>`;
            html += upcoming.map(u => `
                <button class="up-row friend" data-id="${u.user.id}">
                    <div class="up-av">${getInitials(u.user.name)}</div>
                    <div class="up-name">${u.user.name}</div>
                    <div class="badge ${u.daysLeft === 0 ? 'today' : ''}">${u.daysLeft === 0 ? 'Сегодня' : u.daysLeft + ' дн.'}</div>
                </button>
            `).join('');
            html += `<div class="list-sep"></div>`;
        }

        html += `<div class="section-label">ДРУЗЬЯ</div>`;
        html += users.map(user => `
            <div class="friend-row">
                <button class="friend ${user.id === activeUserId ? 'active' : ''}" data-id="${user.id}">
                    <div class="friend-av">${getInitials(user.name)}</div>
                    <div style="flex:1;min-width:0">
                        <span class="friend-name">${user.name}</span>
                        <span class="friend-birth">${formatBirthday(user.birthday)}</span>
                    </div>
                </button>
            </div>
        `).join('');

        this.listBody.innerHTML = html;
    }
}