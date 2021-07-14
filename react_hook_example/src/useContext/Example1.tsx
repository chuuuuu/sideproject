import React, { createContext, useContext, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

type Context = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

const UserContext = createContext<Context | null>(null);

const Index: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Error</div>;
  }

  const { user, setUser } = context;
  return (
    <div>
      <div>Home</div>
      <div>{user}</div>
      {user ? (
        <button
          onClick={() => {
            setUser(null);
          }}
        >
          logout
        </button>
      ) : (
        <button
          onClick={() => {
            setUser("Alice");
          }}
        >
          login
        </button>
      )}
    </div>
  );
};

const About: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    return <div>Error</div>;
  }

  const { user } = context;
  return (
    <div>
      <div>About</div>
      <div>{user}</div>
    </div>
  );
};

export const Example1 = (): JSX.Element => {
  const [user, setUser] = useState<string | null>(null);

  const userMemo = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>
        <UserContext.Provider value={userMemo}>
          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
        </UserContext.Provider>
      </div>
    </Router>
  );
};
