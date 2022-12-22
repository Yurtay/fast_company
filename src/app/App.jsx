import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import EditUser from "./components/ui/editUser";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?" exact component={Users} />
        <Route path="/users/:userId?/edit" component={EditUser} />
        <Route path="/login:type?" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
