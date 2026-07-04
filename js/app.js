document.getElementById('themeBtn').addEventListener('click', (e) => {
    const root = document.documentElement;
    const newTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = newTheme;
    localStorage.setItem('pm-theme', newTheme);
});

window.CURRENT_USER_KEY = 'patimaker-current-user-id';

const storage = new Storage('patimaker');
const repositories = {
    user: new UserRepository(storage),
    group: new GroupRepository(storage),
    chat: new ChatRepository(storage),
    subscription: new SubscriptionRepository(storage),
    wishlist: new WishlistRepository(storage)
};

window.userRepository = repositories.user;
window.groupRepository = repositories.group;
window.chatRepository = repositories.chat;
window.subscriptionRepository = repositories.subscription;
window.wishlistRepository = repositories.wishlist;

seedData();

window.currentUserId = Number(localStorage.getItem(window.CURRENT_USER_KEY));

const services = {
    notification: new Notification(repositories.user, repositories.group, repositories.subscription)
};

const views = {
    sidebar: new Sidebar(),
    main: new MainView(),
    profile: new Profile()
};

const controller = new Controller(repositories, services, views, window.currentUserId);

views.sidebar.bindEvents(
    (userId) => controller.selectUser(userId),
    (groupId) => controller.selectGroup(groupId),
    () => controller.toggleGroupMembership(),
    () => controller.toggleGroupSubscription()
);

views.main.bindEvents((text) => controller.sendChatMessage(text));
views.profile.bindEvents((wishText) => controller.addWish(wishText));

controller.init();