import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { onNewRequset, onSetIsLogin } from "../modules/Common";

export default function useCommon() {
   const dispatch = useDispatch();
   const { count, login, loading, newRequest, e } = useSelector((state: RootState) => state.common);

   const onSetLogin = useCallback((state: boolean) => {
      dispatch(onSetIsLogin(state));
   }, [dispatch]);

   const setNewRequset = useCallback((state: boolean) => {
      //state true mean state need new Request, false is opposite/**/
      dispatch(onNewRequset(state));
   }, [dispatch]);

   // const onGetGaCount = useCallback(() => {
   //    dispatch(getCount());
   // }, [dispatch]);


   // usePreloader(() => dispatch(getCount()));

   // usePreloader([() => dispatch(getCount()), () => dispatch(getCount())]);

   return {
      count,
      login,
      loading,
      onSetLogin,
      newRequest,
      setNewRequset,
      e,
      // onGetGaCount,
   };
}