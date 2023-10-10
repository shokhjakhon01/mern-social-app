import { Navbar } from "./components/navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { NewPost } from "./pages/NewPost";
import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer, initialState } from './reducers/userReducer';
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push('/');
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
        exact
        path="/createpost"
        component={NewPost}
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
