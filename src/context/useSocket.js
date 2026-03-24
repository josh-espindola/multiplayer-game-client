import { useContext } from "react";
import { SocketContext } from "./SocketContext.jsx";

const useSocket = () => useContext(SocketContext);

export { useSocket }