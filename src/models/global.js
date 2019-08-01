import * as accountService from '../pages/account/services/account';

export default {
  namespace: 'global',
  state: {
    me: {},
  },
  effects: {
    * login({payload} , { call, put }) {
      console.log(payload);
      const data = yield call(accountService.login, payload);
      console.log(data);
    },
    * register({payload} , { call, put }) {
      console.log(payload);
      const data = yield call(accountService.register, payload);
      console.log(data);
    },
    *me({payload}, { call, put }) {
      const data = yield call(accountService.me, payload);
      console.log(data);
    }
  },
  reducers: {
  },
}
