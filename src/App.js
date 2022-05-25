import { Routes, Route, useLocation } from "react-router-dom";
import routes from "./config/routes";
import { useContext } from 'react';
import { UserContext } from "./context/user.context";

export default function App() {
  const {user, authenticate, handleLogout } = useContext(UserContext);

  return (
    <div className="App">

      <Routes>
        {routes({ user, authenticate, handleLogout }).map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
     
    </div>
  );
}

