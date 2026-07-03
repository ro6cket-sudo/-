class Notification {
    constructor(userRepository, groupRepository, subcriptionRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.subcriptionRepository = subcriptionRepository;
    }

    getUpcomingBirthdays(id){
        const subs = this.subcriptionRepository.getUserSubcriptions(id);
        const targetUsersIds = new Set();

        subs.forEach((sub) => {
            if (sub.targetUserId) targetUsersIds.add(sub.targetUserId);
            if (sub.targetGroupId) {
                const group = this.groupRepository.getById(sub.targetGroupId);
                if (group) group.members.forEach(member => {targetUsersIds.add(member)});
            }
        })
        targetUsersIds.delete(id);

        const upcomingBirthdays = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        targetUsersIds.forEach((targetId) => {
            const user = this.userRepository.getById(targetId);
            if (!user) return;
             const [y, m, d] = user.birthday.split('-').map(Number);
             let nextBirthday = new Date(today.getFullYear(), m - 1, d)
             if (nextBirthday < today){
                 nextBirthday = new Date(today.getFullYear() + 1, m - 1, d)
             }

             const diffTime = Math.abs(nextBirthday - today);
             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

             if (diffDays <= 7) {
                 upcomingBirthdays.push({ user, date: nextBirthday, daysLeft: diffDays });
             }
        })
        return upcomingBirthdays.sort((a, b) => a.daysLeft - b.daysLeft);
    }
}