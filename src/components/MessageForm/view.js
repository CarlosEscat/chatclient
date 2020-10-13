import React from "react";
import "./view.css";

export default function View(props) {
  const { onSubmit, value, onChange } = props;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Message:</label>
        <input
          className="MessageForm"
          type="text"
          value={value}
          onChange={onChange}
        />
        <button className="Send" type="submit">
          Send
        </button>
      </form>
      <br />
    </div>
  );
}
