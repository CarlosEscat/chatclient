import React from "react";
import "./view.css";

export default function View(props) {
  const { onSubmit, value, onChange, user } = props;

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>Username:</label>
        <input
          className="UserForm"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={user}
        />
        <button className="OkButton" type="submit">
          ok
        </button>
      </form>
      <br />
    </div>
  );
}
