import Message from '../requests/Message';

export default class Conversation {
    id: string = '';
    name: string = '';
    messages: Message[] = [];
    participants: Participant[] = [];
    lastMessage: string = '';
    latestMessageAt: string = '';
    unreadMessages: number = 0;
}

export class Participant {
    id: string = '';
    firstName: string = '';
    lastName: string = '';
}