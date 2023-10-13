import { Navbar } from "./components/navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { NewPost } from "./pages/NewPost";
import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer, initialState } from './reducers/userReducer';
import { useHistory } from "react-router-dom";
import { UserProfile } from "./pages/UserProfile";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push('/login');
    }
  }, []);
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={Home}
      />
      <Route
        path="/login"
        component={Login}
      />
      <Route
        exact
        path="/profile"
        component={Profile}
      />
      <Route
        path="/createpost"
        component={NewPost}
      />
      <Route
        exact
        path="/profile/:userId"
        component={UserProfile}
      />

    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}

export default App;
