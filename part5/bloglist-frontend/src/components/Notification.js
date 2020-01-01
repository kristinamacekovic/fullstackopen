import React from "react";
const Notification = ({ errorMessage }) => (
  <div>
    <p>
      <strong style={{ color: "red" }}>{errorMessage}</strong>
    </p>
  </div>
);

export { Notification };
