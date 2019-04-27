import React from 'react';
import './styles.css'
import {useStateValue} from '../stateManager';

const MessagePanel = () => {
    const [state, dispatch] = useStateValue();

    const messageSort = (userID) =>{
        if(userID == state.loggedInUser.guid){
            return 'internal-Message'
        } else {
            return 'external-Message'
        }
    }

    const MessageMapper = () => {
        const allMessages= state.currentMessages;
        const data = allMessages.map((item,index) => {
            return (
                <span key={index} className={messageSort(item.userId)}>
                    <p>{item.value}</p>
                </span>
            )
        })
        return data
    }
    return(
        <div className="msg-window">
            <MessageMapper/>
        </div>
    )
}

export default MessagePanel