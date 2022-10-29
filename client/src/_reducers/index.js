import { combineReducers } from "redux";
import user from "./user_reducer";
// Store에 여러가지 Reducer가 있을 수 있다. 수정사항의 값을 return 시켜주는 Reducer는 여러개의 state로 나뉘어 있음. 이것을 CombineReducer를 이용해서 root reducer에서 하나로 합쳐줌

//import user from './user_reducer';

const rootReducer = combineReducers({
    user,
});

export default rootReducer;
