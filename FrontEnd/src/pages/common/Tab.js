import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import tabStyle from "./Tab.module.css";
import BoardMain from "../board/Main";
import NoticeMain from "../admin/Main.admin";
import NoticeAdmin from "../admin/NoticeAdmin";
import { decodeJwt } from "../../utils/tokenUtils";

function Navbar() {
  const isLogin = window.localStorage.getItem("accessToken");
  let decoded = null;

  if (isLogin !== undefined && isLogin !== null) {
    const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    decoded = temp.auth[0];
  }
  console.log("decoded ", decoded);

  return (
    <>
      <h3 className={tabStyle.tabTitle}>BLUE Island</h3>
      <Tabs
        defaultActiveKey="board"
        transition={false}
        id="noanim-tab-example"
        className={tabStyle.navTab}
      >
        <Tab eventKey="board" title="전체">
          <BoardMain />
        </Tab>
        {decoded !== "ROLE_ADMIN" && (
          <Tab eventKey="notice" title="공지">
            <NoticeMain />
          </Tab>
        )}
        {decoded === "ROLE_ADMIN" && (
          <Tab eventKey="admin" title="공지 관리 페이지">
            <NoticeAdmin />
          </Tab>
        )}
      </Tabs>
    </>
  );
}

export default Navbar;
