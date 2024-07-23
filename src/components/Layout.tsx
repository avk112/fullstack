import { useEffect, type FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  const dispatch = useDispatch();

  const checkLogged = async () => {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      url: "http://localhost:3000/api/auth/profile",
      headers: {
        Authorization: "Bearer " + token || "",
      },
    };

    const userEmail = await axios
      .request(options)
      .then((res) => {
        if (res.data) {
          return res.data.email;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    userEmail && dispatch(setUser({ email: userEmail }));
  };

  useEffect(() => {
    checkLogged();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
