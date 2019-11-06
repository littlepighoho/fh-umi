import * as accountService from '../services/account';
import { message } from 'antd';

export default {
  namespace: 'account',
  state: {
    me: null,
    auth: {
      logined: false,
      fetched: false,
    },
  },
  effects: {
    * getMessage({ payload }, { call, put, all }) {
      try {
        const result = yield call(accountService.getMessage, payload);
        const { data } = result;
        yield put({
          type: 'saveState',
          payload: {
            keyName:'entities',
            data:result.data,
          },
        })
      } catch (e) {
      }
    },
    * changeMessage({ payload }, { call, put, all }) {
      console.log("model",payload);
      try {
        const result = yield call(accountService.changeMessage, payload);
        const { data } = result;
        yield put({
          type: 'me',
          payload: {
            username:payload.username,
            role:payload.role,
            motto:payload.motto,
            nickname:payload.nickname,
            sex:payload.sex,
            phone:payload.phone,
            new_password:payload.new_password,
            old_password:payload.old_password,
          },

        })
      } catch (e) {
        console(e);
      }
    },
    * me({payload}, { call, put }) {
      try{
        const  { data } = yield call(accountService.me, payload);
        if (data) {
          yield put({
            type: 'saveMe',
            payload: data,
          })
        }
      }catch(e){
        console(e);
      }
    },
  },
  reducers: {
    saveAuth(state, { payload }) {
      return { ...state, auth: payload }
    },
    saveMe(state, { payload }) {
      return { ...state, me: payload, auth: { logined: true, fetched: true } };
    },
    saveState(state, { payload }) {
      return { ...state, [payload.keyName]: payload.data };
  }
  },
}
