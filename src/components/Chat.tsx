import React, { useEffect, useRef, useState } from "react";
import {
    query,
    collection,
    orderBy,
    onSnapshot,
    limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import Message from "../dtos/requests/Message";

const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const scroll = useRef();

    return (
        <main className="chat-box">
            <div className="messages-wrapper">
                {messages?.map((message) => (
                    <Message key={message.id} message={message} />
                ))}
            </div>
            {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
            <span ref={scroll}></span>
            <SendMessage scroll={scroll} />
        </main>
    );
};

export default ChatBox;