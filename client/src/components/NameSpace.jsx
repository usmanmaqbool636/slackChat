import React, { useState } from 'react';
import { socket, namespaceList} from '../socketio';
const NameSpace = ({setRoomList}) => {
    const [NameSpaceList, setNameSpaceList] = useState([]);
    socket.on('nsList', (data) => {
        setNameSpaceList(data);
    })
    const clickHandler = (endpoint) => {
        switch (endpoint) {
            case "/wiki":
                namespaceList.wiki.emit("sendroomdata", {});
                break;
            case "/mozilla":
                namespaceList.mozilla.emit("sendroomdata", {});
                break;
            case "/linux":
                namespaceList.linux.emit("sendroomdata", {});
                break;
            default:
                break;
        }

    }
    Object.keys(namespaceList).forEach(nameSpace=>{
        namespaceList[nameSpace].on('nsRoomLoad', (rooms) => {
            setRoomList(rooms);
        })
    })
    // namespaceList.wiki.on('nsRoomLoad', (rooms) => {
    //     console.log(rooms);
    // })


    return (
        <div className="col-sm-1 namespaces">
            {NameSpaceList.map(name => {
                return (
                    <div
                        key={name.endpoint}
                        title={name.endpoint.split('/')[1]}
                        className="namespace" ns={name.endpoint}
                        onClick={() => clickHandler(name.endpoint)}
                    >
                        <img src={name.img} />
                    </div>
                )
            })}
        </div>
    )
}
export default NameSpace;