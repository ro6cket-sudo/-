const CURRENT_USER_KEY = 'patimaker-current-user-id';

function seedData() {
    if (userRepository.getAllRaw().length > 0) return;

    userRepository.add(new User(null, 'И.Курбан', '2007-02-09', 'kurban@example.com'));
    userRepository.add(new User(null, 'Р.Владимир', '2007-12-04', 'vladimir@example.com'));
    userRepository.add(new User(null, 'Р.Иван', '2007-00-00', 'ivan@example.com'));
    userRepository.add(new User(null, 'А.Максим', '2007-00-00', 'maxim@example.com'));

    const [kurban, vladimir, ivan, maxim] = userRepository.getAll();
    localStorage.setItem(CURRENT_USER_KEY, kurban.id);

    groupRepository.add('Лучшие друзья', kurban.id);
    groupRepository.add('Универ', kurban.id);
    groupRepository.add('Работа', kurban.id);

    const [bestFriends, university, work] = groupRepository.getAll();

    groupRepository.join(bestFriends.id, vladimir.id);
    groupRepository.join(bestFriends.id, ivan.id);
    groupRepository.join(bestFriends.id, maxim.id);

    groupRepository.join(university.id, vladimir.id);
    groupRepository.join(university.id, ivan.id);

    groupRepository.join(work.id, maxim.id);
    groupRepository.join(work.id, kurban.id);

    subscriptionRepository.subscribeToGroup(kurban.id, bestFriends.id);
    subscriptionRepository.subscribeToGroup(kurban.id, university.id);
    subscriptionRepository.subscribeToGroup(kurban.id, work.id);

    wishlistRepository.add(kurban.id, 'Наушники Sony WH-1000XM5');
    wishlistRepository.add(kurban.id, 'Механическая клавиатура');

    wishlistRepository.add(vladimir.id, 'Духи Chanel Chance');
    wishlistRepository.add(vladimir.id, 'Керамическая ваза');

    wishlistRepository.add(ivan.id, 'PlayStation 5');
    wishlistRepository.add(ivan.id, 'Кофемашина');

    wishlistRepository.add(maxim.id, 'Кроссовки New Balance');
    wishlistRepository.add(maxim.id, 'Абонемент в зал');

    chatRepository.addMessage(vladimir.id, kurban.id, 'Что дарим Владимиру в этом году?');
    chatRepository.addMessage(ivan.id, kurban.id, 'У Ивана др сегодня! Все помнят?');
}
