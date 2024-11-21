import React from "react";
import { FadeLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <>
    <div className="LoaderMain">
        <div className="loaderCustom">
          <span className="circle"></span>
          <span className="circle"></span>
          <span className="circle"></span>
          <span className="circle"></span>
        </div>
    </div>
    </>
  );
};

export default PageLoader;
