import React from 'react';
const Rooms =()=>{
    return (
        <div className="col-sm-2 rooms">
          <h3>Rooms</h3>
          <ul className="room-list">
            <li onclick="joinRoom(1,2)">
              <span className="glyphicon glyphicon-lock" />
              Main Room
        </li>
            <li onclick="joinRoom(2,1)">
              <span className="glyphicon glyphicon-globe" />
              Meeting Room
        </li>
          </ul>
        </div>
    )
}
export default Rooms;