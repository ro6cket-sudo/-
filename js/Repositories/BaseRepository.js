class BaseRepository {
    constructor(storage, tableName){
        this.storage = storage;
        this.tableName = tableName;
    }

    getAllRaw(){
        return this.storage.getTable(this.tableName);
    }

    saveAll(data) {
        this.storage.saveTable(this.tableName, data);
    }

    generateId(data) {
        return data.length ? Math.max(...data.map(i => i.id)) + 1 : 1;

    }
}