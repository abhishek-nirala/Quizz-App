// import { useState } from 'react'

import Getques from "./Getques";
import "./App.css";

function App() {
  return (
    <>
      <div id="app" className=" min-h-52 max-w-[700px] my-16 px-5 rounded-lg">
        <h1 className="text-3xl text-white">Play Quiz</h1>
        <Getques />
      </div>
    </>
  );
}

export default App;
