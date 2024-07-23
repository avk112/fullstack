import { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import BodyArea from "../components/BodyArea";
import Register from "../components/Register";
import Login from "../components/Login";

const MyRouter: FC = () => {
  const isAuth = useSelector((state: any) => state.user.email);

  return (
    <Router>
      <Routes>
        {isAuth ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<BodyArea />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate replace to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate replace to="login" />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default MyRouter;
