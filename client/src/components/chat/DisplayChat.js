import React from 'react'
import ChatBubble from './ChatBubble';

const DisplayChat = ({ chat }) => {
    
    return (
        <div>
            {chat.map((messageInfo, index) => {
                return (
                    <ChatBubble key={index} messageInfo={messageInfo} />
                )
            })}
        </div>
    )
}

export default DisplayChat
