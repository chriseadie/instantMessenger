import React,{useEffect,useState} from 'react';
import {useStateValue} from './stateManager';
import InputControls from './InputControls/controls';
import MessagesPanel from './MessagesPanel/panel';
import Chatrooms from './Chatrooms';
import './messenger.css'

const Messenger = () => {
    const [state, dispatch] = useStateValue();

    const [props,setProps] = useState({
        showsettings: false
    })

    const splitURl = window.location.pathname.split('/')
    const urlParam = splitURl[2]
    
    const postBody = {
        activeUserParam:urlParam
    }

    useEffect(() => {
        fetch('http://localhost:5000/api/GetChatRooms',{
            method:"GET",
            headers:{'Content-Type':'application/json'}
        }).then(res => {
            return res.json();
        }).then((res) => {
            dispatch({type:'MOUNT_ROOMS',data:res,room:res[0]})
        })

        fetch('http://localhost:5000/api/getActiveUsers',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(postBody)
        }).then((res) => {
            return res.json();
        }).then((res) => {
            dispatch({type:'SET_ACTIVE_USERS',data:res})
        })
    },[])

    const showSettings = () => {
        setProps({
            showsettings:!props.showsettings
        })
    }

    const logoutter = () => {
        var url = window.location.pathname.split('/')
        const urlParam = {
            toDelete:url[2]
        }

        fetch('http://localhost:5000/api/removeActiveUser', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(urlParam)
        }).then(() => {
            window.location = '/'
        })
    }
    
    return (
        <React.Fragment>
            <div className="headerBanner">
                <h3 className="appTitle">Messenger</h3>
                <button className='settings-btn' onClick={showSettings} >settings</button>
                {props.showsettings && (
                <div className='settings-panel'>
                    <button className='logout-btn' onClick={logoutter}>Logout</button>
                </div>
                )}
            </div>
            <div className="contentContainer">
                <div className="chatrooms">
                    <Chatrooms/>
                </div>
                <div className="chatarea">
                    <div className="chatScrollArea">
                        <MessagesPanel/>
                    </div>
                    <div className="innerChatarea">
                        <InputControls/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Messenger