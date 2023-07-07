import Schedule from "../../Pages/Schedule";
import About from "../About/About";
import MasterBanner from "../MasterBanner/MasterBanner";
import Popular from "../Popular/Popular";

function Home() {
  return (
    <>
      <MasterBanner />
      <Schedule />
      <About />
      <Popular />
    </>
  );
}

export default Home;
