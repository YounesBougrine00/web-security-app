import React from "react";
import DaDog from "../asstets/images/dadog.jpg";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>WUT DA DAWG DOIN?</h1>
      <img alt="dadogimg" style={{ width: "500px" }} src={DaDog}></img>
      <h1>
        <a href="/">GO HOME</a>, BOY, THIS PAGE DOESN'T EVEN EXIST
      </h1>
    </div>
  );
}
