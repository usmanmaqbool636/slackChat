import React from 'react';
import { namespaceList } from '../socketio';
const Messages = ({ numofUser,room }) => {
  const onSubmit = (evt) => {
    evt.preventDefault();

  }
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
        <form id="user-input">
          <div className="col-sm-12">
            <input
              id="user-message"
              type="text"
              placeholder="Enter your message"
            />
          </div>
          {/* <div class="col-sm-2">
                  <input class="btn btn-primary" type="submit" value="send" />
              </div> */}
        </form>
      </div>
      <ul id="messages" className="col-sm-12">
        <li>
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
        </li>
      </ul>
    </div>
  )
}
export default Messages;