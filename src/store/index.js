import { configureStore } from "@reduxjs/toolkit";
import {
  userListAction,
  userListReducer,
  userListSelectors,
} from "./userSlice";
import { postsAction, postsReducer, postsSelectors } from "./postSlice";
import {
  commentsAction,
  commentsReducer,
  commentsSelectors,
} from "./commentSlice";

const store = configureStore({
  reducer: {
    users: userListReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export {
  store,
  userListAction,
  userListSelectors,
  postsAction,
  postsSelectors,
  commentsAction,
  commentsSelectors,
};
