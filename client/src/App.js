import React from 'react';
import NameSpace from './components/NameSpace';
import Rooms from './components/Rooms';
import './App.css';
import Messages from './components/Messages';

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <NameSpace/>
        <Rooms/>
        <Messages/>
      </div>
    </div>
  );
}

export default App;
