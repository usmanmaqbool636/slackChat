import React from 'react';
const Rooms = ({ roomList }) => {
  let nameSpace;
  if(roomList.length){
    nameSpace=roomList[0].namespace;    
  }
  const clickHandle=()=>{
    console.log("clicked")
  }
  return (
    <div className="col-sm-2 rooms">
      <h3>{nameSpace}</h3>
      <ul className="room-list">
        {roomList.map(room => {
          return (
            <li key={`${room.roomTitle} Rooms`}
             onClick={clickHandle}
             >
              <span className="glyphicon glyphicon-globe" />
              {room.roomTitle}
        </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Rooms;