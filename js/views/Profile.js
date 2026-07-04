class Profile {
    constructor() {
        this.overlay = document.getElementById('overlay');
        this.wishContainer = document.getElementById('myWish')

        document.querySelectorAll('[data-profile]').forEach(profile => {
            profile.addEventListener('click', e => {
                this.open()
            })
        })

        document.querySelectorAll('[data-profile]').forEach(profile => {
            profile.addEventListener('click', e => {
                this.close()
            })
        })
    }

    bindEvents(onAddWish) {
        this.onAddWish = onAddWish
    }

    open() {
        this.overlay.classList.remove('hidden')
    }

    close() {
        this.overlay.classList.add('hidden')
    }

    render(user, wishlist) {
        this.wishContainer.innerHTML = wishlist.map(wish => `
            <div class="wish-item">🎁 ${wish.itemName}</div>
        `).join('')

        this.wishContainer.innerHTML += `
            <div class"row" style="margin-top:10px;">
                <input id="newWishInput" style="flex:1" class="field input" placeholder="Новый подарок...">
                <button id="addWishButton" class="button-primary" style="width: auto">Добавить</button>
            </div>
        `

        document.getElementById('addWishButton').addEventListener('click', event => {
            const value = document.getElementById('newWishInput').value.trim();
            if (value && this.onAddWish) {
                this.onAddWish(value);
            }
        })
    }
}