import React, {useState}from 'react';
import './styles.css'
import {useStateValue} from '../stateManager';
import {guid} from '../helpers'
import EmojiPanel from './emojiPanel'

const InputControls = () => {
    const [messenger,updateMessage] = useState({
        value: '',
        showSend:false,
        showEmoji:false,
        addHeight:''
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
        if(messenger.value.length > 86){
            updateMessage({...messenger,
                value:e.target.value,
                showSend:true,
                addHeight:'addHeight'
            })
        } else {
            updateMessage({...messenger,
                value:e.target.value,
                showSend:true,
                addHeight:''
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

    const getLatestMessage = () => {
        fetch('http://localhost:5000/api/GetChatRooms',{
            method:"GET",
            headers:{'Content-Type':'application/json'}
        }).then(res => {
            return res.json();
        }).then((res) => {
            sortMessages(res)
        })
    }
    const sortMessages = (res) => {
        var current = res.find(item => {
            return item.id === state.currentRoom
         })
         
        if(current !== undefined){
            dispatch({
                type:'SET_LATEST_MESSAGES',
                data:res, 
                messages:current.replys
            })
        }
        
    }

    var getMsgs = setInterval(() => {
        getLatestMessage()
        clearInterval(getMsgs)
    },10000)

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
    const showEmojiPanel = () => {
        updateMessage({...state,
            showEmoji:!messenger.showEmoji,
            value:messenger.value,
            showSend:messenger.showSend
        })
    }

    const handleEmoji = (data) => {
        updateMessage({
            value:data,
            showSend:true,
            showEmoji:false
        })
    }

    return (
        <div className="control-wrapper">
            <textarea name="messagePanel" value={messenger.value} className={`text-input ${messenger.addHeight}`} placeholder="type your message" onChange={handleChange}/>
            <button className="emojibutton" onClick={showEmojiPanel}>😀</button>
            {messenger.showEmoji && (
                <EmojiPanel text={messenger.value} handleEmoji={handleEmoji}/>
            )}
            {messenger.showSend && (
                <button className="messageButton" onClick={() => createMessage(messenger.value)}>Send</button>
            )}
            
        </div>
    )
}

export default InputControls;