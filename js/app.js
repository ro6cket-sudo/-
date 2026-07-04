document.getElementById('themeBtn').addEventListener('click', (e) => {
    const root = document.documentElement
    const newTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = newTheme;
    localStorage.setItem('pm-theme', newTheme);
})

const storage = new Storage('patimaker');
const repositories = {
    user: new UserRepository(storage),
    group: new GroupRepository(storage),
    chat: new ChatRepository(storage),
    subscription: new SubscriptionRepository(storage),
    wishlist: new WishlistRepository(storage)
}

seedData()
const currentUserId = Number(localStorage.getItem(CURRENT_USER_KEY))

const services = {
    notification: new Notification(repositories.user, repositories.group, repositories.subscription)
}

const views = {
    sidebar: new Sidebar(),
    main: new MainView(),
    profile: new Profile()
}

const controller = new Controller(repositories, services, views, currentUserId);
controller.init();