import { useState, type FC, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import classes from "./Login.module.scss";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ email: "", password: "" });

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e: FormEvent) => {
    e.preventDefault();

    const options = {
      method: "POST",
      url: "http://localhost:3000/api/auth/login",
      data: {
        email: input.email,
        password: input.password,
      },
    };

    return axios
      .request(options)
      .then((res) => {
        if (res.data.email === input.email) {
          localStorage.setItem("token", res.data.token);
          dispatch(setUser({ email: input.email }));
          setInput({ email: "", password: "" });
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className={classes.login}>
      <h1 className={classes.login__title}>Log In</h1>

      <form className={classes.login__form} onSubmit={handleForm}>
        <label className={classes.login__form__label}>
          <h3 className={classes.login__form__label__title}>Enter email</h3>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleInputs}
          />
        </label>
        <label className={classes.login__form__label}>
          <h3 className={classes.login__form__label__title}>Enter password</h3>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleInputs}
          />
        </label>
        <button>Enter</button>
      </form>

      <span className={classes.login__bottomText}>
        Don't have an account? <Link to="/register">Register now</Link>
      </span>
    </div>
  );
};

export default Login;
