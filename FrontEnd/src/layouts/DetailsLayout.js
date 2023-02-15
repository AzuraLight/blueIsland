import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import layoutStyle from "./Layout.css";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer className={layoutStyle.footer} />
    </>
  );
}

export default Layout;
