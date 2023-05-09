import LoginPage from "./pages/LoginPage";
import { check } from "./http/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import React, { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    check().then((data) => {
      dispatch(setUser(data));
    });
  }, []);

  return <LoginPage />;
}

export default App;
