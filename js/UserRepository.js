class UserRepository {
    constructor(storage) {
        this.storage = storage;
        this.tableName = 'users';
    }

    getAll(){
        const rawData = this.storage.getTable(this.tableName);
        return rawData.map(user => new User(user.id, user.name, user.birthday, user.email));
    }

    getById(id){
        const users = this.getAll();
        return users.find(user => user.id === id) || null;
    }

    add(user){
        const users = this.getAll();
        const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 0;
        user.id = newId;
        users.push(user);
        this.storage.saveTable(this.tableName, users);
    }

    update(updatedUser){
        const users = this.getAll();
        const index = users.findIndex(user => user.id === updatedUser.id);
        if (index > -1) {
            users[index] = updatedUser;
            this.storage.saveTable(this.tableName, users);
        }
    }
}