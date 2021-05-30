import React from 'react'
import ChatBubble from './ChatBubble';

const ActiveChat = ({ chat }) => {
    return (
        <div>
            {chat && chat.map((messageInfo, index) => {
                return (
                    <ChatBubble key={index} messageInfo={messageInfo} />
                )
            })}
        </div>
    )
}

export default ActiveChat
