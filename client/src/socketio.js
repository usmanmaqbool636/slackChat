import io from "socket.io-client";
export const socket = io("http://localhost:9000");
const wiki = io("http://localhost:9000/wiki");
const mozilla = io("http://localhost:9000/mozilla");
const linux = io("http://localhost:9000/linux");
export const namespaceList = {wiki, mozilla, linux}