import Message from './Message';

export default class ConversationRequest {
    participantIds: string[] = [];
    name: string = '';
    message: Message = new Message();
}