import { useContext } from "react";
import SideBar from "./components/Sidebar/SideBar";
import AdminRouting from "./routes/Routing";
import "./styles/Style.scss";

function Admin() {

  return (
    <>
      <div className="d-flex"> 
        <SideBar />
        <div className="routing__wrapper">
          <div className="admin__title__wrapper">
            <p>Dashboard</p>
            
          </div>
          <AdminRouting />
        </div>
      </div>
    </>
  );
}

export default Admin;
