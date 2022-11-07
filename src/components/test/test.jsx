import React from "react";
import { redirect } from "react-router-dom";

const Test = (props) => {
  function navigate() {
    
    redirect("login")
    console.log('asdasds')
  }
  return (
    
    <>
         <p>asdfsd</p>
      <button type="button" onClick={navigate}>aaa</button>
    </>
  );
};

export default Test;
