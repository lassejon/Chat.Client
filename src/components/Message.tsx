import React, { useState } from "react";
import Message from "../dtos/requests/Message";
import AuthenticatedUser from "../dtos/responses/AuthenticatedUser";
import tempAvatart from "../assets/temp/profile-icon-simple-flat-style-person-people-user-avatar-pictogram-message-office-business-man-concept-illustration-isolated-on-white-background-eps-10-vector.jpg";

const Message = ({ message }: { message: Message }) => {
    const [loggedInUser, setLoggedInUser] = useState<AuthenticatedUser | null>(null);
    return (
        <div className={`chat-bubble ${message.userId === loggedInUser?.id ? "right" : ""}`}>
            <img
                className="chat-bubble__left"
                src={tempAvatart}
                alt="user avatar"
            />
            <div className="chat-bubble__right">
                <p className="user-name">{message.name}</p>
                <p className="user-message">{message.message}</p>
            </div>
        </div>
    );
};

export default Message;