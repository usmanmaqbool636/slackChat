import React, { useState } from 'react';
import NameSpace from './components/NameSpace';
import Rooms from './components/Rooms';
import './App.css';
import Messages from './components/Messages';
import {CookiesProvider} from 'react-cookie';
// import {socket,linux,mozilla,wiki} from './socketio';
import axios from 'axios';

function App() {
  const [roomList,setRoomList]=useState([]);
  const [numofUser,setNumofUser]=useState(0);;
  const [room,setRoom]=useState(null);
  const clickHandler=()=>{
    axios.get("http://localhost:9000")
      .then(res=>{
        console.log(res);
      })
  }
  // const username = prompt("What is your username?")
  // console.log(username)
  // console.log(socket,linux,mozilla,wiki)
  return (
    // <CookiesProvider>
    // <button onClick={clickHandler}>
    //   button
    // </button>
    // </CookiesProvider>
    <div className="container-fluid">
      
      <div className="row">
        <NameSpace setRoomList={setRoomList} />
        <Rooms roomList={roomList} setRoom={setRoom} setNumofUser={setNumofUser}/>
        <Messages roomList={roomList} room={room} numofUser={numofUser} />
      </div>
    </div>
  );
}

export default App;
