let selectedFriendId = null;

function renderFriendsList() {
    const listBody = document.getElementById('listBody');
    const friends = userRepository.getAll().filter(u => u.id !== currentUserId);

    listBody.innerHTML = '';

    friends.forEach(friend => {
        const row = document.createElement('div');
        row.className = 'friend-row';

        const btn = document.createElement('button');
        btn.className = 'friend' + (friend.id === selectedFriendId ? ' active' : '');
        btn.innerHTML = `
            <div class="friend-av">${getInitials(friend.name)}</div>
            <div style="flex:1;min-width:0">
                <span class="friend-name">${friend.name}</span>
                <span class="friend-birth">${formatBirthday(friend.birthday)}</span>
            </div>
        `;
        btn.addEventListener('click', () => {
            selectedFriendId = friend.id;
            renderFriendsList();
        });

        const delBtn = document.createElement('button');
        delBtn.className = 'friend-del';
        delBtn.textContent = '×';
        delBtn.title = 'Удалить';

        row.appendChild(btn);
        row.appendChild(delBtn);
        listBody.appendChild(row);
    });
}
