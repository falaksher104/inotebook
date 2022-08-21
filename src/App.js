import React from "react";
import { Switch, Route} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AddNote from "./pages/AddNote";
import { ProtectedRoute } from "./protected.route";

const App = () => {
  return (
    <>
      <Switch>


        <Route exact path="/" component={Home} />

        <ProtectedRoute
          path="/login"
          exact
          component={() => <Login />}
          otherWay={true}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/signup"
          exact
          component={() => <Signup />}
          otherWay={true}
        ></ProtectedRoute>

        {/* <Route exact path="/signup" component={<Signup />} /> */}
        <ProtectedRoute
          path="/addnote"
          exact
          component={() => <AddNote />}
        ></ProtectedRoute>
      </Switch>
    </>
  );
};

export default App;
