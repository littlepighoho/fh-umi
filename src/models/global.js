import * as accountService from '../pages/account/services/account';
import { message } from 'antd';

export default {
  namespace: 'global',
  state: {
    me: null,
    auth: {
      logined: false,
      fetched: false,
    },
  },
  effects: {
    * login({payload} , { call, put, all }) {
      try {
        const result = yield call(accountService.login, payload);
        const { data } = result;
        if (data) {
          message.success('登陆成功');
          yield put({
            type: 'saveAuth',
            payload: {
              logined: true,
              fetched: false,
            },
          });
          yield put({
            type: 'me',
            payload: {},
          })
        }
      } catch (e) {

      }
    },
    * checkLogin({ payload }, { call, put, all }) {
      const result = yield call(accountService.checkLogin, payload);
      const { data } = result;
      if (data.id) {
        yield put({
          type: 'me',
          payload: {},
        })
      } else {
        yield put({
          type: 'saveAuth',
          payload: {
            logined: false,
            fetched: true,
          },
        })
      }
    },
    * logout({ payload }, { call, put }) {
      try {
        const result = yield call(accountService.logout, payload);
        const { data } = result;
        yield put({
          type: 'saveAuth',
          payload: false,
        })
      } catch (e) {

      }
    },
    * me({payload}, { call, put }) {
      // console.log("$$$$");
      const  { data } = yield call(accountService.me, payload);
      if (data) {
        yield put({
          type: 'saveMe',
          payload: data,
        })
      }
    },
    * register({ payload }, { call, put }) {
      try {
        const result = yield call(accountService.register, payload);
        const { data } = result;
        if (data) {
          message.success('注册成功')
        }
      } catch (e) {

      }
    }
  },
  *accounts({payload},{call,put}){
    try{
      const result = yield call(accountService.accounts,payload);
      const { data } =result;
      yield put({
        type: 'saveAuth',
        payload: false,
      })
    } catch (e) {
    }

  },
  reducers: {
    saveAuth(state, { payload }) {
      return { ...state, auth: payload }
    },
    saveMe(state, { payload }) {
      return { ...state, me: payload, auth: { logined: true, fetched: true }}
    }
  },
}
