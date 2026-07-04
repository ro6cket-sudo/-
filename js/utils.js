const MONTHS_GENITIVE = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

function getInitials(name) {
    const parts = String(name || '').split(/[\s.]+/).filter(Boolean);
    return parts.slice(0, 2).map(p => p[0].toUpperCase()).join('');
}

function formatBirthday(birthday) {
    if (!birthday) return '—';
    const parts = String(birthday).split('-').map(Number);
    if (parts.length < 3) return '—';
    const [, month, day] = parts;
    if (!month || !day || month < 1 || month > 12 || day < 1 || day > 31) return '—';
    return `${day} ${MONTHS_GENITIVE[month - 1]}`;
}

function getDaysLet(birthday) {
    if (!birthday) return null;
    const parts = String(birthday).split('-').map(Number);
    if (parts.length < 3) return null;
    const [, m, d] = parts;
    if (!m || !d || m < 1 || m > 12 || d < 1 || d > 31) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let nextBirthday = new Date(today.getFullYear(), m - 1, d);
    if (nextBirthday < today) {
        nextBirthday = new Date(today.getFullYear() + 1, m - 1, d);
    }
    return Math.ceil(Math.abs(nextBirthday - today) / (1000 * 60 * 60 * 24));
}