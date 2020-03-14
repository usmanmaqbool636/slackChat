import React, { useEffect } from 'react';
import { namespaceList } from '../socketio';
const Rooms = ({ roomList, setNumofUser, setRoom }) => {
  let nameSpace;
  console.log(roomList[0])
  if (roomList.length) {
    nameSpace = roomList[0].namespace;
  }

  useEffect(() => {
  if (roomList.length > 0) {
    Object.keys(namespaceList).forEach(key => {
      namespaceList[key].emit("joinRoom", { room: roomList[0].roomTitle && "", namespace: `/${nameSpace.toLowerCase()}` });
      setRoom(roomList[0].roomTitle)
    })
  }

  Object.keys(namespaceList).forEach(key => {
    namespaceList[key].on("updateroommember", (newNumofMembers) => {
      setNumofUser(newNumofMembers);
      console.log("updateroomNumber==>>", newNumofMembers)
    })
  })
  }, [])

  const clickHandle = (room, ns) => {
    switch (ns) {
      case "Wiki":       
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