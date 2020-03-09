import React from 'react';
import { namespaceList } from '../socketio';
const Rooms = ({ roomList, setNumofUser, setRoom }) => {
  let nameSpace;
  if (roomList.length) {
    nameSpace = roomList[0].namespace;
  }
  const clickHandle = (room, ns) => {
    switch (ns) {
      case "Wiki":
        console.log(room)
        namespaceList.wiki.emit("joinRoom", { room, namespace: `/${ns.toLowerCase()}` }, (newNumofMembers) => {
          // console.log('roomjoined', 'newNumofMembers', newNumofMembers)
          setRoom(room)
          setNumofUser(newNumofMembers);
        });
        break;
      case "Mozilla":
        namespaceList.mozilla.emit("joinRoom", { room, namespace: `/${ns.toLowerCase()}` }, (newNumofMembers) => {
          setNumofUser(newNumofMembers);
          setRoom(room)
          console.log('roomjoined', 'newNumofMembers', newNumofMembers)

        });
        break;
      case "Linux":
        console.log(room)
        namespaceList.linux.emit("joinRoom", { room, namespace: `/${ns.toLowerCase()}` }, (newNumofMembers) => {
          setRoom(room)
          setNumofUser(newNumofMembers);
          console.log('roomjoined', 'newNumofMembers', newNumofMembers)

        });
        break;
      default:
        break;
    }
  }
  console.log(roomList)
  return (
    <div className="col-sm-2 rooms">
      <h3>{nameSpace}</h3>
      <ul className="room-list">
        {roomList.map(room => {
          return (
            <li key={`${room.roomTitle} Rooms`}
              onClick={() => clickHandle(room.roomTitle, nameSpace)}
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