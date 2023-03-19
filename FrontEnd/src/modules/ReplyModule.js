import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_REPLIES = "reply/GET_REPLIES";
export const POST_REPLIES = "reply/POST_REPLIES";
export const PUT_REPLIES = "reply/PUT_REPLIES";
export const DELETE_REPLIES = "reply/DELETE_REPLIES";
// eslint-disable-next-line
const actions = createActions({
  [GET_REPLIES]: () => {},
  [POST_REPLIES]: () => {},
  [PUT_REPLIES]: () => {},
  [DELETE_REPLIES]: () => {},
});

/* 리듀서 */
const replyReducer = handleActions(
  {
    [GET_REPLIES]: (state, { payload }) => {
      return payload;
    },
    [POST_REPLIES]: (state, { payload }) => {
      return payload;
    },
    [PUT_REPLIES]: (state, { payload }) => {
      return payload;
    },
    [DELETE_REPLIES]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default replyReducer;
