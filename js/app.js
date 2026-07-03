const storage = new Storage('patimaker');

const userRepository = new UserRepository(storage);
const groupRepository = new GroupRepository(storage);
const chatRepository = new ChatRepository(storage);
const subscriptionRepository = new SubscriptionRepository(storage);
const wishlistRepository = new WishlistRepository(storage);

const notification = new Notification(userRepository, groupRepository, subscriptionRepository);

seedData();

const currentUserId = Number(localStorage.getItem(CURRENT_USER_KEY));
const currentUser = userRepository.getById(currentUserId);

renderFriendsList();
