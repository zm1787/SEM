import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, removeNotification } from '../../../actions/notificationActions';


const FriendRequest = ({ item }) => {
    const auth = useSelector((store) => store.auth);
    const socket = useSelector((store) => store.socket);

    const onAcceptFriendRequest = (data) => {
        data.receiverName = `${auth.user.firstName} ${auth.user.lastName}`
        socket.emit('accept-friend-request', data);

        console.log("Friend request accepted")
    }

    const onDeclineFriendRequest = (request_id) => {
        console.log("Friend request declined")
    }

    return (
        <>
            <p>{item.senderName} would like to chat with you.</p>
            <button onClick={e => onAcceptFriendRequest(item)}>Accept</button>
            <button onClick={e => onDeclineFriendRequest(item)}>Decline</button>
        </>
    )
}

export default FriendRequest
