import { routerRedux } from 'dva/router';
// import { stringify } from 'querystring';
import { message } from 'antd';
import get from 'lodash/get';
import {
  accountLogin,
  accountRegister,
  accountCheckStatus,
  accountGetCurrent,
  accountLogout,
  accountGetList,
  accountFetchList,
  accountDelete,
  accountEdit,
} from '@/services/account';
import { setAuthority } from '@/utils/authority';
// import { getPageQuery } from '@/utils/utils';
import { DVAKEYS } from '@/constant/dvaKeys';

const Model = {
  namespace: DVAKEYS.ACCOUNT.ROOT,
  // TODO 账户列表entities
  state: {
    logined: false, // 登录状态
    registerStatus: '', // 注册状态
    registerAccount: '', // 注册邮箱
    currentAccount: null,
    accountEntities: [], // 账户详细信息
    accountList: { // 账户列表
      accounts: [],
      pagination: {},
    },
  },
  effects: {
    // 登录
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(accountLogin, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              logined: true,
              currentAuthority: 'admin',
            },
          });
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 注册
    *register({ payload }, { call, put }) {
      try {
        const response = yield call(accountRegister, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          yield put({
            type: 'changeRegisterStatus',
            payload: {
              status: 'ok',
              registerAccount: payload.username,
            },
          })
        } else {
          yield put({
            type: 'changeRegisterStatus',
            payload: {
              status: 'error',
            },
          })
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 登出
    *logout(_, { call, put }) {
      try {
        yield call(accountLogout);
        yield put({
          type: 'changeLoginStatus',
          payload: {
            logined: false,
            registerStatus: '',
            registerAccount: '',
            currentAccount: null,
          },
        });
        message.success('登出成功');
        if (window.location.pathname !== '/user/login') {
          yield put(
            routerRedux.replace({
              pathname: '/user/login',
            }),
          );
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 检查登录态
    *checkStatus(_, { call, put }) {
      try {
        const response = yield call(accountCheckStatus);
        const { data } = response;
        if (get(data, 'id', null)) {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              logined: true,
              currentAuthority: 'admin',
            },
          });
          yield put({
            type: 'getCurrentAccount',
          })
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 获取当前登录账户信息
    *getCurrentAccount(_, { call, put }) {
      try {
         const response = yield call(accountGetCurrent);
         const { data } = response;
         yield put({
           type: 'saveCurrentAccount',
           payload: {
             currentAccount: data,
           },
         })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 获取账户列表
    *getAccountList({ payload }, { call, put }) {
      try {
        const response = yield call(accountGetList, payload);
        const { data } = response;
        const { accounts, pagination } = data;
        yield put({
          type: 'saveAccountList',
          payload: {
            accounts,
            pagination,
          },
        });
        const ids = accounts.map(item => item.id);
        yield put({
          type: 'fetchAccountList',
          payload: {
            ids,
          },
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 批量获取账户信息
    *fetchAccountList({ payload }, { call, put }) {
      try {
        const response = yield call(accountFetchList, payload);
        const { data } = response;
        yield put({
          type: 'saveAccountEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 删除指定账户
    *deleteAccount({ payload }, { call }) {
      try {
        const response = yield call(accountDelete, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('删除成功')
        } else {
          message.error('删除失败')
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 修改指定账户
    *editAccount({ payload }, { call }) {
      try {
        const response = yield call(accountEdit, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('修改成功')
        } else {
          message.error('修改失败')
        }
      } catch (e) {
        message.error(e.toString())
      }
    },
  },
  reducers: {
    changeRegisterStatus(state, { payload }) {
      return {
        ...state,
        registerStatus: payload.status,
        registerAccount: payload.registerAccount,
      }
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        logined: payload.logined,
      };
    },
    saveCurrentAccount(state, { payload }) {
      return {
        ...state,
        currentAccount: payload.currentAccount,
      }
    },
    saveAccountList(state, { payload }) {
      return {
        ...state,
        accountList: { ...payload },
      }
    },
    saveAccountEntities(state, { payload }) {
      return {
        ...state,
        accountEntities: payload,
      }
    },
  },
};
export default Model;

