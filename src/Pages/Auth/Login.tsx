import React, { useState, useContext } from "react";
import SampleButton from "../../Components/Button/SampleButton";
import SampleInput from "../../Components/Input/SampleInput";
import { logo } from "../../assets";
import "../../Scss/Main.scss";
import { loginI } from "../../Interface/Auth/LoginInterface";
import { UserContext } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { NavLink, useNavigate } from "react-router-dom";
import { ActiveUserContext } from "../../context/ActiveUser";

function Login() {
  const credentials: loginI = {
    email: "",
    password: "",
  };
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(UserContext);
  const { activeUser, setActiveUser } = useContext(ActiveUserContext);
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState<loginI>(credentials);
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const findUser = user?.find(
      (item) => item.email === loginCredentials.email
    );
    if (loginCredentials.email === "" || loginCredentials.password === "") {
      enqueueSnackbar("Empty Field Detected", { variant: "error" });
    }
    if (findUser) {
      if (
        findUser?.email === loginCredentials.email &&
        findUser?.password === loginCredentials.password
      ) {
        enqueueSnackbar("You have successfully logged in", {
          variant: "success",
        });
        setActiveUser({ ...findUser });
        navigate("/");
      }
      if (findUser?.password !== loginCredentials.password) {
        enqueueSnackbar("Incorrect Password", {
          variant: "error",
        });
      }
    }
    if (
      !findUser &&
      loginCredentials.email !== "" &&
      loginCredentials.password !== ""
    ) {
      enqueueSnackbar("Cannot find your email. Create Account", {
        variant: "error",
      });
    }
  };

  const toggleHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setTogglePassword(!togglePassword);
  };
  return (
    <div className="container">
      <div className="login__wrapper">
        <div className="login__left__section">
          <img src={logo} alt="logo" />
        </div>
        <div className="login__right__section">
          {/* <div className="login__img__section">
            <img src={logo} alt="" />
          </div> */}
          <h3>Please Login To Continue</h3>
          <div className="login__form__section">
            <form>
              <div className="login__input__bar">
                <label htmlFor="">Email : </label>
                <br />
                <SampleInput
                  type="email"
                  placeHolder="Email .."
                  name="email"
                  value={loginCredentials.email}
                  onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                    inputHandler(e)
                  }
                />
              </div>
              <div className="login__input__bar">
                <label htmlFor="">Password : </label>
                <br />
                <SampleInput
                  type={togglePassword ? "text" : "password"}
                  placeHolder="Password .."
                  name="password"
                  value={loginCredentials.password}
                  onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                    inputHandler(e)
                  }
                />
                {togglePassword ? (
                  <span
                    onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
                      toggleHandler(e)
                    }
                  >
                    <i className="fa-solid fa-eye-slash"></i>
                  </span>
                ) : (
                  <span
                    onClick={(e: React.MouseEvent<HTMLSpanElement>) =>
                      toggleHandler(e)
                    }
                  >
                    <i className="fa-solid fa-eye"></i>
                  </span>
                )}
              </div>
              <div className="login__btn">
                <SampleButton
                  title="login"
                  nameOfClass=""
                  handler={(e: React.MouseEvent<HTMLButtonElement>) =>
                    loginHandler(e)
                  }
                />
              </div>
            </form>
          </div>
          <div className="admin__login">
            <NavLink to="/admin">
              <p>Admin Login ?</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
