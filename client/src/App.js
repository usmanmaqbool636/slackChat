import React, { useState } from 'react';
import NameSpace from './components/NameSpace';
import Rooms from './components/Rooms';
import './App.css';
import Messages from './components/Messages';
import {socket,linux,mozilla,wiki} from './socketio';

function App() {
  const [roomList,setRoomList]=useState([]);
  // const username = prompt("What is your username?")
  // console.log(username)
  // console.log(socket,linux,mozilla,wiki)
  return (
    <div className="container-fluid">
      
      <div className="row">
        <NameSpace setRoomList={setRoomList} />
        <Rooms roomList={roomList}/>
        <Messages/>
      </div>
    </div>
  );
}

export default App;
