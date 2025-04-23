import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";


export default function App() {
  

  return (
    <>
      <Header></Header>
      <div className="content flex">
        <Sidebar></Sidebar>
        <Main></Main>
      </div>
  
  </>)
}
