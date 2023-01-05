import React, { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import Quality from "./quality";

const TestUser = ({ params }) => {
  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  const userId = params.match.params.postId;

  if (users) {
    return (
      <>
        <table>
          {users.map((user) => {
            if (user._id === userId) {
              return (
                <tbody key={`${user._id}`}>
                  <tr key={`${user.name}`}>
                    <td>
                      <h3>{user.name}</h3>
                    </td>
                  </tr>
                  <tr key={`${user.profession.name}`}>
                    <td>
                      <h4>{user.profession.name}</h4>
                    </td>
                  </tr>
                  <tr key={`${user.qualities}`}>
                    <td>
                      {user.qualities.map((qual) => (
                        <Quality {...qual} key={qual._id} />
                      ))}
                    </td>
                  </tr>
                  <tr key={`${user.completedMeetings}`}>
                    <td>completedMeetings: {user.completedMeetings}</td>
                  </tr>
                  <tr key={`${user.rate}`}>
                    <td>
                      <h4>rate: {user.rate}</h4>
                    </td>
                  </tr>
                </tbody>
              );
            }
          })}
        </table>
        <button>
          <Link to="/users">Все пользователи</Link>
        </button>
      </>
    );
  }
  return "loading...";
};

export default TestUser;
