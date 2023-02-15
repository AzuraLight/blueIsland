import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import boardReducer from "./BoardModule";
import noticeReducer from "./NoticeModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer,
  noticeReducer,
});

export default rootReducer;
