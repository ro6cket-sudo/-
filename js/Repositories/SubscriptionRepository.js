class SubscriptionRepository extends BaseRepository {
    constructor(storage) {
        super(storage, 'subscriptions');
    }

    getUserSubcriptions(id) {
        return this.getAllRaw().filter(c => c.userId === id);
    }

    subscribeToUser(userId, targetUserId) {
        const subs = this.getAllRaw();
        if (!subs.some(s => s.userId === userId && s.targetUserId === targetUserId)) {
            subs.push(new Subscription(this.generateId(subs), userId, targetUserId, null));
            this.saveAll(subs);
        }
    }

    subscribeToGroup(userId, targetGroupId) {
        const subs = this.getAllRaw();
        if (!subs.some(s => s.userId === userId && s.targetGroupId === targetGroupId)) {
            subs.push(new Subscription(this.generateId(subs), userId, null, targetGroupId));
            this.saveAll(subs);
        }
    }
}