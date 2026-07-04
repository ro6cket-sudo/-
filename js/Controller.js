class Controller {
    constructor(repositories, services, views, currentUserId) {
        this.repositories = repositories;
        this.services = services;
        this.views = views;
        this.currentUserId = currentUserId;

        this.activeGroupId = null
        this.activeUserId = null;
    }

    init() {
        this.views.sidebar.bindEvents(
            (userId) => this.sele
        )
    }

    selectUser(userId) {
        this.activeUserId = userId;
        this.refreshSidebar();

        const user = this.repositories.user.getById(userId);
        const isSelf = userId === this.currentUserId;
        const userGroups = this.repositories.group.getByUserId(userId);
        const wishlist = this.repositories.wishlists.getByUserId(userId);
        const messages = this.repositories.message.getMessagesForUser(userId);
        const allUsers = this.repositories.users.getAll()

        this.views.main.renderCard(user, isSelf, userGroups, wishlist, messages, allUsers);
    }

    selecrGroup(groupId) {
        this.activeGroupId = groupId;
        this.activeUserId = null;
        this.views.main.showEmpty()
        this.refreshSidebar()
    }

    sendChatMessage(text) {
        if (!this.activeUserId) return
        this.repositories.chat.addMessage(this.activeUserId, this.currentUserId, text);
        this.selectUser(this.activeUserId);
    }

    toggleGroupMembership() {
        if (!this.activeGroupId) return
        const group = this.repositories.group.getById(this.activeGroupId);
        if (group.members.includes(this.currentUserId)) {
            this.repositories.groups.remove(this.activeGroupId, this.currentUserId);
        } else {
            this.repositories.groups.join(this.activeGroupId, this.currentUserId);
        }
        this.refreshSidebar();
    }

    toggleGroupSubscription() {
        if (!this.activeGroupId) return
        const subscribes = this.repositories.subscriptions.getUserSubcriptions(this.activeGroupId);
        const isSubbed = subscribes.some(s => s.targetGroupId === this.activeGroupId);
        if (!isSubbed) {
            this.repositories.subscriptions.subscribeToGroup(this.currentUserId, this.activeGroupId);
            this.refreshSidebar();
        }
    }

    refreshSidebar() {
        const allGroups = this.repositories.group.getAll();
        let users = this.repositories.user.getAll();

        let activeGroup = null
        let isMember = false
        let isSubscribed = false

        if (this.activeGroupId) {
            activeGroup = this.repositories.groups.getById(this.activeGroupId);
            users = users.filter(user => activeGroup.members.includes(user.id));
            isMember = activeGroup.members.includes(this.currentUserId);
            isSubscribed = this.repositories.subscriptions.getUserSubcriptions(this.currentUserId).some(s => s.targetGroupId === this.activeGroupId);
        }

        const upcoming = this.services.notification.getUpcomingBirthdays(this.currentUserId)

        this.views.sidebar.renderRail(allGroups, this.activeGroupId)
        this.views.sidebar.renderList(users, this.activeUserId, activeGroup, isSubscribed, isMember, upcoming)
    }

    refreshProfile(){
        const user = this.repositories.user.getById(this.currentUserId);
        const wish = this.repositories.wishlists.getByUserId(this.currentUserId)
        this.views.profile.render(user, wish)
    }
}