import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_BOARD = "board/GET_BOARD";
export const GET_BOARDS = "board/GET_BOARDS";
export const POST_BOARD = "board/POST_BOARD";
export const PUT_BOARD = "board/PUT_BOARD";
export const DELETE_BOARD = "board/DELETE_BOARD";
// eslint-disable-next-line
const actions = createActions({
  [GET_BOARD]: () => {},
  [GET_BOARDS]: () => {},
  [POST_BOARD]: () => {},
  [PUT_BOARD]: () => {},
  [DELETE_BOARD]: () => {},
});

/* 리듀서 */
const boardReducer = handleActions(
  {
    [GET_BOARD]: (state, { payload }) => {
      return payload;
    },
    [GET_BOARDS]: (state, { payload }) => {
      return payload;
    },
    [POST_BOARD]: (state, { payload }) => {
      return payload;
    },
    [PUT_BOARD]: (state, { payload }) => {
      return payload;
    },
    [DELETE_BOARD]: (state, { payload }) => {
      return payload;
    },
  },
  initialState
);

export default boardReducer;
