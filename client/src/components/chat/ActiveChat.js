import React, {useEffect} from 'react'
import ChatBubble from './ChatBubble';


const ActiveChat = ({messages}) => {

    return (
        <div>
            {messages && messages.map((messageInfo, index) => {
                return (
                    <ChatBubble key={index} messageInfo={messageInfo} />
                )
            })}
        </div>
    )
}

export default ActiveChat
