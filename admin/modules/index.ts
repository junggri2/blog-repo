import { combineReducers } from "redux";
import textEdit from "./TextEditor";
import common from "./Common";
import topic from "./Topic";

const rootReducer = combineReducers({ textEdit, common, topic });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>