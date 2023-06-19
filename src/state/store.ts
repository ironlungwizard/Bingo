import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk"
import reducers, { RootState } from "./reducers";
import { ThunkMiddleware } from "@reduxjs/toolkit";

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk as ThunkMiddleware<RootState>)
)