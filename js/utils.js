const MONTHS_GENITIVE = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

function getInitials(name) {
    const parts = name.split(/[\s.]+/).filter(Boolean);
    return parts.slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function formatBirthday(birthday) {
    const [, month, day] = birthday.split('-').map(Number);
    return `${day} ${MONTHS_GENITIVE[month - 1]}`;
}

function getDaysLet(birthday) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [y, m, d] = birthday.split('-').map(Number);
    let nextBirthday = new Date(today.getFullYear(), m - 1, d);
    if (nextBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, m - 1, d);
    }
    return Math.ceil(Math.abs(nextBirthday - today) / (1000 * 60 * 60 * 24));
}
