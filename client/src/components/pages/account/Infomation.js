import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Infomation() {
  const [ users, setUsers ] = useState("");
  const appState = useSelector(state => state);

  useEffect(() => {
    if (appState.users.data) {
      setUsers(appState.users.data);
    }
    
  }, [appState.users.data]);

  return (
    <ul className="list-group shadow">
      <li className="list-group-item text-muted">
        Thông tin <i className="fa fa-dashboard fa-1x" />
      </li>
      <li className="list-group-item text-left">
        <span>
          <strong>Tên: </strong>
        </span>
        {users.username}
      </li>
      <li className="list-group-item text-left">
        <span>
          <strong>Email: </strong>
        </span>
        {users.email}
      </li>
      <li className="list-group-item text-left">
        <span>
          <strong>Quyền: </strong>
        </span>
        {users.role}
      </li>
    </ul>
  );
}
