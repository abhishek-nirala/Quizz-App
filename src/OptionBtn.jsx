import "./App.css";
import { io } from "socket.io-client";
// import socket from './Getques'
const socket = io("http://localhost:3000");

function Btns() {
  const handleRefreshBtn = () => {
    // location.reload()
    // return window.open("https://google.com", "Example", "width=300,height=400");
    socket.emit("get-data");
  };

  return (
    <>
      <div>
        <button
          className="text-[16px]  border rounded-lg p-1"
          onClick={handleRefreshBtn}
        >
          Next
        </button>
      </div>
    </>
  );
}
export default Btns;
