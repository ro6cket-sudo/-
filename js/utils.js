const MONTHS_GENITIVE = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

function getInitials(name) {
    const parts = name.split(/[\s.]+/).filter(Boolean);
    return parts.slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function formatBirthday(birthday) {
    const [, month, day] = birthday.split('-').map(Number);
    return `${day} ${MONTHS_GENITIVE[month - 1]}`;
}
