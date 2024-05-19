import Message from '../requests/Message';

export default class Conversation {
    id: string = '';
    name: string = '';
    messages: Message[] = [];
    lastMessage: string = '';
    lastMessageTime: string = '';
    unreadMessages: number = 0;
}