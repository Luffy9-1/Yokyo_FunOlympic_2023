import React, { useContext, useState, useEffect } from "react";
import SampleButton from "../Components/Button/SampleButton";
import Title from "../Components/Title/Title";
import { fun, logo } from "../assets";
import { ActiveUserContext } from "../context/ActiveUser";
import { useSnackbar } from "notistack";

interface initialStateI {
  fullName?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
}

function Profile() {
  const { activeUser, setActiveUser } = useContext(ActiveUserContext);
  const initialState: initialStateI = {
    fullName: activeUser?.firstName,
    age: activeUser?.age,
    email: activeUser?.email,
    password: "",
    confirmPassword: "",
    currentPassword: "",
  };
  const [infoData, setInfoData] = useState<initialStateI>(initialState);
  const { enqueueSnackbar } = useSnackbar();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setInfoData({ ...infoData, [name]: value });
  };
  useEffect(() => {
    setInfoData({
      fullName: activeUser?.fullName,
      age: activeUser?.age,
      email: activeUser?.email,
    });
  }, []);

  const passwordHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (infoData.currentPassword === "") {
      enqueueSnackbar("Please Insert First. Thank you", {
        variant: "error",
      });
    } else if (
      infoData.password === "" ||
      infoData.confirmPassword === ""
    ) {
      enqueueSnackbar("Please Insert First. Thank you", {
        variant: "error",
      });
    } else if (infoData.currentPassword !== activeUser?.password) {
      enqueueSnackbar("Current Password din't Match With Previous One", {
        variant: "error",
      });
    } else if (infoData.password !== infoData.confirmPassword) {
      enqueueSnackbar("New Password din't Match With Confirm Password", {
        variant: "error",
      });
    } else {
      const updateInfoData = infoData;
      delete updateInfoData.currentPassword;
      setActiveUser({ ...activeUser!, ...updateInfoData });
      enqueueSnackbar("information has been uploaded successfully", {
        variant: "success",
      });
      setInfoData(initialState);
    }
  };

  console.log("info data : x`", infoData);

  return (
    <div className="profile__wrapper">
      <div className="container">
        <div className="profile__content">
          <div className="profile__section">
            <div className="logo__section">
              <img src={logo} alt="logo" />
            </div>
            <Title title="Edit Information" />
            <div className="account__information">
              <div className="form__input">
                <label htmlFor="">Full Name : </label>
                <br />
                <input
                  type="text"
                  name="fullName"
                  value={infoData?.fullName}
                  placeholder="Full Name ..."
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeHandler(e);
                  }}
                />
              </div>
              <div className="form__input">
                <label htmlFor="">Age : </label>
                <br />
                <input
                  type="text"
                  placeholder="Age ..."
                  name="age"
                  value={infoData?.age}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeHandler(e);
                  }}
                />
              </div>
              <div className="form__input">
                <label htmlFor="">Email : </label>
                <br />
                <input
                  type="text"
                  placeholder="Email ..."
                  name="email"
                  value={infoData?.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeHandler(e);
                  }}
                />
              </div>
              <div className="form__input">
                <label htmlFor="">Current Password : </label> <br />
                <input
                  type="text"
                  placeholder="Current Password ..."
                  name="currentPassword"
                  value={infoData?.currentPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeHandler(e);
                  }}
                />
              </div>
              <div className="form__input">
                <label htmlFor="">New Password : </label>
                <br />
                <input
                  type="text"
                  placeholder="New Password ..."
                  name="password"
                  value={infoData?.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeHandler(e);
                  }}
                />
              </div>
              <div className="form__input">
                <label htmlFor="">Confirm New Password : </label>
                <br />
                <input
                  type="text"
                  placeholder="Confirm Password ..."
                  name="confirmPassword"
                  value={infoData?.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeHandler(e);
                  }}
                />
              </div>
              <SampleButton
                nameOfClass="mb-4"
                title="Update"
                handler={(e: React.MouseEvent<HTMLButtonElement>) => {
                  passwordHandler(e);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
