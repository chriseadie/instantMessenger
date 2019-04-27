import React,{useState} from 'react';
import {useStateValue} from '../stateManager';
import './style.css'
import {guid,DateMaker} from '../helpers'

const ChatRooms = () => {
    const [state, dispatch] = useStateValue();
    const [room,setRoom] = useState({
        inputroom:false,
        roomName:''
    })
    var rooms = state.mountedRooms

    const Allrooms = () => {
        var data = rooms.map((item,key) => {
            return (
                <div key={key} className="chatroomBlock" onClick={() => chooseRoom(item.id)}>{item.roomName}</div>
            )
        })
        return (
            <React.Fragment>
                {room.inputroom ? (
                    <div className="add-new-room">
                        <input type="text" placeholder="Enter name of chatroom" onChange={handleRoomName}/>
                        <div className="dflex">
                            <p onClick={SendNewRoom}>save</p>
                            <b className="btn cross" onClick={addNewRoom}>+</b>
                        </div>
                    </div>
                ):(
                    <div className="add-new-room">
                        <p>Add New Room</p>
                        <b className="btn" onClick={addNewRoom}>+</b>
                    </div>
                )}
                
                {data}
            </React.Fragment>
        )
    }

    const SendNewRoom = () => {
        var newroom = {
        id: guid(),
        roomName: room.roomName,
        lastUpdated: DateMaker(),
        replys:[]
        }
        fetch('http://localhost:5000/api/addNewRoom',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newroom)
        })
        .then(res => {
            return res.json();
        }).then(res => {
            dispatch({type:"ADD_NEW_ROOM",data:res})
        })
        setRoom({
            inputroom:false
        })
    }

    const handleRoomName = (e) => {
        setRoom({...state,
            roomName:e.target.value,
            inputroom:true
        })
    }

    const addNewRoom = () => {
        setRoom({
            inputroom:!room.inputroom,
            roomName:''
        })
    }

    const chooseRoom = (Id) =>{
        var test = rooms.find(item => {
            return item.id === Id
        })
        dispatch({type:'ADD_NEW_MESSAGE',data:test.replys})
        dispatch({type:'CURRENT_ROOM',data:test.id})
    }

    
    return (
        <div>
            {Allrooms()}
        </div>
    )
}

export default ChatRooms