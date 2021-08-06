import { ICommonAction, ICommonState } from "./common.interface";
// import util from "../../lib/axios";


export const SET_IS_LOGIN = "common/SET_IS_LOGIN";

export const NEW_REQUEST = "common/NEW_REQUEST";

export const GET_GA_COUNT = "common/GET_GA_COUNT";
export const GET_GA_COUNT_SUCCESS = "common/GET_GA_COUNT_SUCEESS";
export const GET_GA_COUNT_FAIL = "common/GET_GA_COUNT_FAIL";

export const onSetIsLogin = (payload: boolean) => ({ type: SET_IS_LOGIN, payload });

export const onNewRequset = (payload: boolean) => ({ type: NEW_REQUEST, payload: payload });

export const onGetGaCount = () => ({ type: GET_GA_COUNT });
export const onGetGaCountSuccess = (payload: any) => ({ type: GET_GA_COUNT_SUCCESS, payload });
export const onGetGaCountFail = (e: Error) => ({ type: GET_GA_COUNT_FAIL, error: e });
// typescript는 const를 이해하므로(typeof CHECK_GUESTBOOK은 string이 아니라 'CHECK_GUESTBOOK'입니다)
// 액션 이름을 그대로 쓰셔도 됩니다.

//thunk 생성함

// export const getCount = () => async (dispatch: any) => {
//    try {
//       dispatch(onGetGaCount());
//       const { data } = await util.getGACount();
//       dispatch(onGetGaCountSuccess(data));
//    } catch (e) {
//       dispatch(onGetGaCountFail(e));
//    }
// };


const initialState: ICommonState = {
   count: null,
   login: false,
   loading: false,
   newRequest: true,
   e: null,
};


export default function common(state: ICommonState = initialState, action: ICommonAction): ICommonState {
   switch (action.type) {
      case SET_IS_LOGIN:
         return {
            ...state,
            login: action.payload as boolean,
         };
      case NEW_REQUEST:
         return {
            ...state,
            newRequest: action.payload as boolean,
         };
      // case GET_GA_COUNT:
      //    return {
      //       ...state,
      //    };
      // case GET_GA_COUNT_SUCCESS:
      //    return {
      //       ...state,
      //       count: action.payload,
      //    };
      // case GET_GA_COUNT_FAIL:
      //    return {
      //       ...state,
      //       e: action.e,
      //    };
      default:
         return state;
   }
}