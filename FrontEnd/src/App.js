import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import DetailsLayout from "./layouts/DetailsLayout";
import Login from "./pages/member/Login";
import BoardDetail from "./pages/board/BoardDetail";
import BoardRegist from "./pages/board/BoardRegist";
import NoticeDetail from "./pages/notice/NoticeDetail";
import NoticeRegist from "./pages/admin/NoticeRegist";
import Register from "./pages/member/Register";
import Error from "./pages/Error";
import appStyle from "./App.css";

function App() {
  return (
    <BrowserRouter className={appStyle}>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/" element={<DetailsLayout />}>
          <Route path="boards/read-only/:boardNo" element={<BoardDetail />} />
          <Route path="boards/user-only" element={<BoardRegist />} />
          <Route
            path="notices/read-only/:noticeNo"
            element={<NoticeDetail />}
          />
          <Route path="notices/admin-only" element={<NoticeRegist />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
