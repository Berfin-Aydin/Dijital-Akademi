import * as ACTIONS from "./Constans";
import {login, logout, signup} from "../api/apiCalls";

export const logoutSuccess = () => {
    return async function(dispatch){
        try {
            await logout();
        }catch (err) {

        }
        dispatch({type: ACTIONS.LOGOUT_SUCCESS})
    }
}

export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    };
}

export const loginHandler = (credentials) => {
    return async function (dispatch) {
        const response = await login(credentials);
        const authState = {
            ...response.data.user,
            userName: response.data.userName,
            token:response.data.token
        }
        dispatch(loginSuccess(authState));
        //kullanıcı listesini getirirken giriş yapan kullanıcı getirmeyecek
        return response
    }
}

export const signupHandler = (user) => {
    return async function (dispatch) {
        const response = await signup(user);
        //await ile fonksiyonun sonucunun dönmesini bekler
        const {userName, userPassword} = user;
        const body= {
            userName,
            password:userPassword
        }
        await dispatch(loginHandler(body));
        return response;
    };
}