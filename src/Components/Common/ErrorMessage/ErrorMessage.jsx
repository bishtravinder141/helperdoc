import React from "react";
  const ErrorMessage = ({ msg ,alignText = false}) => {
    return <p className={`text-danger ${(alignText)&& "text-center mt-2"}`} style={{color: 'red'}}>{msg}</p>;
  };
  
  export default ErrorMessage;
  