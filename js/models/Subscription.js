class Subscription {
    constructor(id, userId, targetUserId = null, targetGroupId = null) {
        this.id = id;
        this.userId = userId;
        this.targetUserId = targetUserId;
        this.targetGroupId = targetGroupId;
    }
}