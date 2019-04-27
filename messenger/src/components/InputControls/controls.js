import React, {useState}from 'react';
import './styles.css'
import {useStateValue} from '../stateManager';
import {guid} from '../helpers'

const InputControls = () => {
    const [messenger,updateMessage] = useState({
        value: '',
        showSend:false
    });
    const [state,dispatch] = useStateValue();

    const handleChange = (e) => {
        updateMessage({
            value:e.target.value
        })
        if(e.target.value.length > 0){
            updateMessage({...messenger,
                value:e.target.value,
                showSend:true
            })
        } else {
            updateMessage({...messenger,
                value:e.target.value,
                showSend:false
            })
        }
    }

    const fetchAllRooms = () => {
        fetch('http://localhost:5000/api/GetChatRooms',{
            method:"GET",
            headers:{'Content-Type':'application/json'}
        }).then(res => {
            return res.json();
        }).then((res) => {
            dispatch({type:'REMOUNT_ROOMS',data:res,room:state.currentRoom})
        })
    }

    // const getLatestMessage = () => {
    //     fetch('http://localhost:5000/api/GetChatRooms',{
    //         method:"GET",
    //         headers:{'Content-Type':'application/json'}
    //     }).then(res => {
    //         return res.json();
    //     }).then((res) => {
    //         dispatch({type:'SET_LATEST_MESSAGES',data:res})
    //     })
    // }

    // setInterval(() => {
    //     getLatestMessage()
    // },10000)

    const createMessage = (message) => {
        const date = new Date();
        const msg = {
            user:state.loggedInUser.username,
            dateSend:`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            value:message,
            userId:state.loggedInUser.guid,
            messageId:guid(),
            chatRoomsId:state.currentRoom
        }

        fetch('http://localhost:5000/api/addMessageToChat',{
            method:'POST',
            body:JSON.stringify(msg),
            headers:{'Content-Type':'application/json'} 
        }).then((res) => {
            fetchAllRooms()
        })


        updateMessage({
            value:'',
            showSend:false
        })
        
        
    }

    return (
        <div className="control-wrapper">
            <textarea name="messagePanel" value={messenger.value} className="text-input" placeholder="type your message" onChange={handleChange}/>
            {messenger.showSend && (
                <button className="messageButton" onClick={() => createMessage(messenger.value)}>Send</button>
            )}
            
        </div>
    )
}

export default InputControls;