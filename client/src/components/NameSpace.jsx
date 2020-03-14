import React, { useState } from 'react';
import { socket, namespaceList } from '../socketio';
const NameSpace = ({ setRoomList }) => {
    const [NameSpaceList, setNameSpaceList] = useState([]);
    socket.on('nsList', (data) => {
        setNameSpaceList(data);
        // namespaceList.wiki.emit("sendroomdata", {});
    })
    const clickHandler = (endpoint) => {
        // console.log("click",endpoint)
        switch (endpoint) {
            case "/wiki":
                console.log("click", endpoint)
                namespaceList.wiki.emit("sendroomdata",{});
                // namespaceList.wiki.emit("sendroomdata", {}, (data) => {
                //     setRoomList(data);
                //     console.log("data=>", data);
                // });
                namespaceList.linux.close();
                namespaceList.mozilla.close();
                break;
            case "/mozilla":
                console.log("click", endpoint)

                namespaceList.mozilla.emit("sendroomdata",{});
                namespaceList.linux.close();
                namespaceList.wiki.close();
                break;
            case "/linux":
                console.log("click", endpoint)

                namespaceList.linux.emit("sendroomdata",{});
                namespaceList.wiki.close();
                namespaceList.mozilla.close();
                break;
            default:
                break;
        }

    }
    Object.keys(namespaceList).forEach(nameSpace => {
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