import { GET_GA_COUNT, GET_GA_COUNT_FAIL, GET_GA_COUNT_SUCCESS, NEW_REQUEST, SET_IS_LOGIN } from "./index";

export interface ICommonState {
   count: any
   login: boolean
   loading: boolean
   newRequest: boolean
   e: Error | null
}

export interface ICommonAction {
   type:
      | typeof SET_IS_LOGIN
      | typeof NEW_REQUEST
      | typeof GET_GA_COUNT
      | typeof GET_GA_COUNT_SUCCESS
      | typeof GET_GA_COUNT_FAIL
   payload: string | boolean | any
   e: Error
}

export interface ICommonModuleProps {
   count: any
   login: boolean
   loading: boolean
   onSetLogin: (state: boolean) => void
   newRequest: boolean
   setNewRequset: (state: boolean) => void
   // onGetGaCount: () => void
   e: Error | null
}
