class ChatRepository extends BaseRepository {
    constructor(storage) {
        super(storage, 'chats');
    }

    getMessagesForUser(id) {
        return this.getAllRaw().filter(c => c.targetUserId === id).sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    addMessage(id, senderId, text) {
        const messages = this.getAllRaw();
        messages.push(new ChatMessage(this.generateId(messages), id, senderId, text, new Date().toISOString()));
        this.saveAll(messages);
    }
    clear(targetUserId) {
        this.saveAll(this.getAllRaw().filter(c => c.targetUserId !== targetUserId));
    }
}