import axios from "axios";
import { useState, type FC, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import classes from "./Register.module.scss";
import { Link } from "react-router-dom";

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    if (input.password === input.repeatPassword) {
      const options = {
        method: "POST",
        url: "http://localhost:3000/api/user",
        data: {
          email: input.email,
          password: input.password,
        },
      };

      return axios
        .request(options)
        .then((res) => {
          if (res.data.message === "success") {
            localStorage.setItem("token", res.data.token);
            dispatch(setUser({ email: input.email }));
            setInput({ email: "", password: "", repeatPassword: "" });
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.register__title}>Register</h1>

      <form className={classes.register__form} onSubmit={handleForm}>
        <label className={classes.register__form__label}>
          <h3 className={classes.register__form__label__title}>Enter email</h3>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleInputs}
          />
        </label>
        <label className={classes.register__form__label}>
          <h3 className={classes.register__form__label__title}>
            Enter password
          </h3>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleInputs}
          />
        </label>
        <label className={classes.register__form__label}>
          <h3 className={classes.register__form__label__title}>
            Repeat password
          </h3>
          <input
            type="password"
            name="repeatPassword"
            value={input.repeatPassword}
            onChange={handleInputs}
          />
        </label>
        <button>Enter</button>
      </form>

      <span className={classes.register__bottomText}>
        Already have an account? <Link to="/login">Log In</Link>
      </span>
    </div>
  );
};

export default Register;
