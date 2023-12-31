import React, { useState, useContext } from "react";
import SampleButton from "../../Components/Button/SampleButton";
import SampleInput from "../../Components/Input/SampleInput";
import { logo } from "../../assets";
import "../../Scss/Main.scss";
import { loginI } from "../../Interface/Auth/LoginInterface";
import { UserContext } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import { useNavigate , NavLink} from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

function AdminLogin() {
  const credentials: loginI = {
    email: "",
    password: "",
  };
  const { isActive, setIsActive, admin, setAdmin } = useContext(AdminContext);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState<loginI>(credentials);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loginCredentials.email === "" || loginCredentials.password === "") {
      enqueueSnackbar("Empty Field Detected", { variant: "error" });
    } else if (
      loginCredentials.email === "admin@gmail.com" &&
      loginCredentials.password === "password"
    ) {
      enqueueSnackbar("Successfully Logged In as ADMIN.", {
        variant: "success",
      });
      setIsActive(true);
      setAdmin({ ...loginCredentials });
      navigate("/");
    } else {
      enqueueSnackbar("Not Verified as ADMIN.", { variant: "error" });
    }
  };
  return (
    <div className="container">
      <div className="login__wrapper">
        <div className="login__left__section">
          <img src={logo} alt="logo" />
        </div>
        <div className="login__right__section">
          <div className="login__img__section">
            <img src={logo} alt="logo" />
          </div>
          <h3>Admin Login</h3>
          <div className="login__form__section">
            <form>
              <div className="login__input__bar">
                <label htmlFor="">Email : </label>
                <br />
                <SampleInput
                  type="email"
                  placeHolder="Enter Your Email Here .."
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
                  type="password"
                  placeHolder="Enter Your Password Here .."
                  name="password"
                  value={loginCredentials.password}
                  onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                    inputHandler(e)
                  }
                />
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
              <NavLink to='/login'>
              <p>Login ?</p>
              </NavLink>
            </div>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
