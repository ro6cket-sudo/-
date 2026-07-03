class WishlistRepository {
    constructor(storage) {
        this.storage = storage;
        this.tableName = 'wishlists';
    }

    getAll(){
        const rawData = this.storage.getTable(this.tableName);
        return rawData.map(user => new User(user.id, user.name, user.birthday, user.email));
    }

    getById(id){
        const wishlists = this.getAll();
        return wishlists.find(user => user.id === id) || null;
    }

    add(user){
        const wishlists = this.getAll();
        const newId = wishlists.length > 0 ? Math.max(...wishlists.map(user => user.id)) + 1 : 0;
        user.id = newId;
        wishlists.push(user);
        this.storage.saveTable(this.tableName, wishlists);
    }

    update(updatedUser){
        const wishlists = this.getAll();
        const index = wishlists.findIndex(user => user.id === updatedUser.id);
        if (index > -1) {
            wishlists[index] = updatedUser;
            this.storage.saveTable(this.tableName, wishlists);
        }
    }
}