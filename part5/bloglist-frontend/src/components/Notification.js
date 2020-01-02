import React from "react";
const Notification = ({ message }) =>
  message ? (
    <div style={{ height: "50px" }}>
      <h1 style={{ color: "red" }}>{message}</h1>
    </div>
  ) : null;

export { Notification };
