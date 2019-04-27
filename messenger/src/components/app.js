import React from 'react'
import { StateProvider } from './stateManager';
import Login from './Login';
import Messenger from './messenger';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import '../main.css';

const App = () => {
  const initialState = {
    currentMessages:[],
    mountedRooms:[],
    loggedInUser:'',
    currentRoom:'',
    settingsPanel:false
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_NEW_MESSAGE':
          return {...state,currentMessages:action.data};
        case 'MOUNT_ROOMS':
          return {...state, mountedRooms:action.data,currentMessages:action.room.replys,currentRoom:action.room.id};
          break;
        case 'CURRENT_ROOM':
          return {...state,currentRoom:action.data};
        case 'UPDATED_CHAT_ROOMS':
          return {...state,mountedRooms:action.data};
        case 'REMOUNT_ROOMS':
          var msgs = action.data.find(props => {
            return props.id === action.room
          })
          return {...state, mountedRooms:action.data,currentMessages:msgs.replys};
        case 'SET_ACTIVE_USERS':
          return {...state,loggedInUser:action.data};
        case 'ADD_NEW_ROOM':
          return {...state,mountedRooms:action.data};
        case 'SET_LATEST_MESSAGES':
          return {...state,mountedRooms:action.data};
      default:
        return state;
    }
  };
  
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/messenger/:id" component={Messenger} />
          </Switch>
        </BrowserRouter>
    </StateProvider>
  );
}

export default App