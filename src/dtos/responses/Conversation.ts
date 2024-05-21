import Message from '../requests/Message';

export default class Conversation {
    id: string = '';
    name: string = '';
    messages: Message[] = [];
    participants: Participant[] = [];
    latestMessage: string = '';
    latestMessageAt: Date = new Date();
    unreadMessages: number = 0;
}

export class Participant {
    id: string = '';
    firstName: string = '';
    lastName: string = '';
}