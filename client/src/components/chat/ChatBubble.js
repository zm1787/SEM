import React from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';


const ChatBubble = ({ messageInfo }) => {
    const auth = useSelector((store) => store.auth)

    let classes = "chat-bubble"
    messageInfo.sender_id === auth.user._id ? classes = `${classes} from-you` : classes = `${classes} from-other`

    return (
        <div className={classes}>
            <Typography>{messageInfo.message}</Typography>
        </div>
    )
}

export default ChatBubble
