class Storage {
    constructor(name) {
        this.name = name;
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.name)) {
            const intialData = {users: [], groups: [], subscriptions: [], wishlists: [], chats: []};
            localStorage.setItem(this.name, JSON.stringify(intialData));
        }
    }

    getTable(tableName) {
        const data = JSON.parse(localStorage.getItem(this.name));
        return data[tableName] || [];
    }

    saveTable(tableName, tableData) {
        const data = JSON.parse(localStorage.getItem(this.name));
        data[tableName] = tableData;
        localStorage.setItem(this.name, JSON.stringify(data));
    }
}