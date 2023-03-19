import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import boardReducer from "./BoardModule";
import noticeReducer from "./NoticeModule";
import replyReducer from "./ReplyModule";

const rootReducer = combineReducers({
  memberReducer,
  boardReducer,
  noticeReducer,
  replyReducer,
});

export default rootReducer;
