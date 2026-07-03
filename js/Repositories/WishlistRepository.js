class WishlistRepository extends BaseRepository {
    constructor(storage) {
        super(storage, 'wishlists');
    }

    getByUserId(userId) {
        return this.getAllRaw().filter(w => w.userId === userId).map(w => new WishItem(w.id, w.userId, w.itemName));
    }

    add(userId, itemName) {
        const items = this.getAllRaw();
        const item = new WishItem(this.generateId(items), userId, itemName);
        items.push(item);
        this.saveAll(items);
    }

    update(id, newName) {
        const items = this.getAllRaw();
        const item = items.find(i => i.id === id);
        if (item) {
            item.itemName = newName;
            this.saveAll(items);
        }
    }

    delete(id) {
        this.saveAll(this.getAllRaw().filter(i => i.id !== id));
    }
}