import MessageDto from "../dtos/requests/Message";
import AuthenticatedUser from "../dtos/responses/AuthenticatedUser";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import MessageInbound from "./MessageInbound";
import MessageOutbound from "./MessageOutbound";

const Message = ({ message }: { message: MessageDto }) => {
    const authenticatedUser = useAuthUser<AuthenticatedUser>();
    const authenticatedUserId = authenticatedUser?.id ?? '';
    return (
        <>
            {
                authenticatedUserId === message.userId ?
                    <MessageOutbound message={message.content} id={message.id} />
                    :
                    <MessageInbound message={message} />
            }
        </>
    );
};

export default Message;