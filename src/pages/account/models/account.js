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
          type: 'saveAuth',
          payload: false,
        })
      } catch (e) {
      }
    },
    * changeMessage({ payload }, { call, put, all }) {
      try {
        const result = yield call(accountService.changeMessage, payload);
        const { data } = result;
        yield put({
          type: 'saveAuth',
          payload: false,
        })
      } catch (e) {
      }
    },
    * me({payload}, { call, put }) {
      const  { data } = yield call(accountService.me, payload);
      if (data) {
        yield put({
          type: 'saveMe',
          payload: data,
        })
      }
    },
  },
  reducers: {
    saveAuth(state, { payload }) {
      return { ...state, auth: payload }
    },
    saveMe(state, { payload }) {
      return { ...state, me: payload, auth: { logined: true, fetched: true } };
    }
  },
}
