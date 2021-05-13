import React from 'react'
import { makeStyles, Typography } from '@material-ui/core';


const ChatBubble = ({ messageInfo }) => {

    let classes = "chat-bubble"
    messageInfo.sender === "You" ? classes = `${classes} from-you` : classes = `${classes} from-other`
    console.log(classes)

    return (
        <div className={classes}>
            
            <Typography>{messageInfo.message}</Typography>
            
        </div>
    )
}

export default ChatBubble
