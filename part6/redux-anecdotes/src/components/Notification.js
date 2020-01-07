import React from "react";

export const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  };

  return <div style={style}>{props.store.getState().message}</div>;
};