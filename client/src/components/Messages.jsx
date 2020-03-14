import React, { useState } from 'react';
import { namespaceList, socket } from '../socketio';
const Messages = ({ roomList, numofUser, room }) => {
  const [msg, setMsg] = useState("")
  const [msgList,setMsgList]= useState([]);
  let ns;
  if (roomList.length) {
    ns = roomList[0].namespace;
  }

  const submitHandler = (evt) => {
    evt.preventDefault();
    switch (ns) {
      case "Wiki":
        console.log('wiki');
        namespaceList.wiki.emit("newMessageToServer", { text: msg });
        break;
      case "Mozilla":
        namespaceList.mozilla.emit("newMessageToServer", { text: msg });
        break;
      case "Linux":
        namespaceList.linux.emit("newMessageToServer", { text: msg });
        break;
      default:
        break;
    }
  }
  Object.keys(namespaceList).forEach(ns=>{
    namespaceList[ns].on("messageToClient",(msg)=>{
      console.log(msg);
      setMsgList(pre=>[...pre,msg])
    })
  })
  return (
    <div className="chat-panel col-sm-9">
      <div className="room-header row col-6">
        <div className="col-sm-3">
          <span className="curr-room-text">{room}</span>{" "}
          <span className="curr-room-num-users">
            {" "}{numofUser} <span className="glyphicon glyphicon-user" />
          </span>
        </div>
        <div className="col-sm-3 search pull-right">
          <span className="glyphicon glyphicon-search" />
          <input type="text" id="search-box" placeholder="Search" />
        </div>
      </div>
      <div className="message-form">
        <form id="user-input" onSubmit={submitHandler}>
          <div className="col-sm-12">
            <input
              id="user-message"
              type="text"
              placeholder="Enter your message"
              value={msg}
              onChange={(evt) => setMsg(evt.target.value)}
            />
          </div>
          {/* <div class="col-sm-2">
                  <input class="btn btn-primary" type="submit" value="send" />
              </div> */}
        </form>
      </div>
      <ul id="messages" className="col-sm-12" >
        
        {msgList.map(msg=>{
          const convertedDate= new Date(msg.time).toLocaleString();
          return (
            <li>
          <div className="user-image">
            <img src={msg.avatar} />
          </div>
          <div className="user-message">
            <div className="user-name-time">
              {msg.username} <span>{convertedDate}</span>
            </div>
            <div className="message-text">{msg.text}</div>
          </div>
        </li>
          )
        })}
        {/* <li>
          <div className="user-image">
            <img src="https://via.placeholder.com/30" />
          </div>
          <div className="user-message">
            <div className="user-name-time">
              rbunch <span>1:25 pm</span>
            </div>
            <div className="message-text">I went running today.</div>
          </div>
        </li>
        <li>
          <div className="user-image">
            <img src="https://via.placeholder.com/30" />
          </div>
          <div className="user-message">
            <div className="user-name-time">
              rbunch <span>2:25 pm</span>
            </div>
            <div className="message-text">
              I'm getting my tires changed this afternoon.
            </div>
          </div>
        </li>
        <li>
          <div className="user-image">
            <img src="https://via.placeholder.com/30" />
          </div>
          <div className="user-message">
            <div className="user-name-time">
              rbunch <span>2:29 pm</span>
            </div>
            <div className="message-text">I like history.</div>
          </div>
        </li>
        <li>
          <div className="user-image">
            <img src="https://via.placeholder.com/30" />
          </div>
          <div className="user-message">
            <div className="user-name-time">
              rbunch <span>2:59 pm</span>
            </div>
            <div className="message-text">What day is tomorrow?.</div>
          </div>
        </li> */}
      </ul>
    </div>
  )
}
export default Messages;