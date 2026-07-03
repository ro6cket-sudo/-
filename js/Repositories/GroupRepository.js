class GroupRepository extends BaseRepository {
    constructor(storage) {
        super(storage, 'groups');
    }

    getAll() {
        return this.getAllRaw().map(g => new Group(g.id, g.name, g.members));
    }

    getById(id) {
        return this.getAll().find(g => g.id === id);
    }

    add(name, creatorId) {
        const groups = this.getAllRaw();
        const group = new Group(this.generateId(groups), name, [creatorId]);
        groups.push(group);
        this.saveAll(groups);
    }

    join(groupId, userId) {
        const groups = this.getAllRaw();
        const group = groups.find(g => g.id === groupId);
        if (group && !group.members.includes(userId)) {
            group.members.push(userId);
            this.saveAll(groups);
        }
    }

    leave(groupId, userId) {
        const groups = this.getAllRaw();
        const group = groups.find(g => g.id === groupId);
        if (group) {
            group.members = group.members.filter(id => id !== userId);
            this.saveAll(groups);
        }
    }
}