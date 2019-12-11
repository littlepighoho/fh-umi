import request from '@/utils/request';
import { API } from '@/constant/apis';
import PathToRegexp from 'path-to-regexp';
/**
 * 登录
 * POST
 * @param payload: { username, password }
 * @return request
 * */
export async function accountLogin(payload) {
  return request(API.ACCOUNT.LOGIN, {
    method: 'POST',
    data: {
      username: payload.username,
      password: payload.password,
    },
  });
}

/**
 * 注册
 * POST
 * @param payload: { username, password }
 * @return request
 */
export async function accountRegister(payload) {
  return request(API.ACCOUNT.REGISTER, {
    method: 'POST',
    data: {
      username: payload.username,
      password: payload.password,
    },
  });
}

/**
 * 检查登录状态
 * GET
 * @return request
 */
export async function accountCheckStatus() {
  return request(API.ACCOUNT.LOGIN, {
    method: 'GET',
  });
}

/**
 * 登出
 * POST
 * @return request
 */
export async function accountLogout() {
  return request(API.ACCOUNT.LOGOUT, {
    method: 'POST',
  })
}

/**
 * 获取当前登录信息
 * GET
 * @return request
 */
export async function accountGetCurrent() {
  return request(API.ACCOUNT.CURRENT, {
    method: 'GET',
  })
}

/**
 * 获取所有账户列表
 * GET
 * @param payload
 * @return request
 */
export async function accountGetList(payload) {
  return request(API.ACCOUNT.LIST, {
    method: 'GET',
    params: payload.params,
  })
}

/**
 * 批量获取账户信息
 * POST
 * @param payload: { ids }
 * @return request
 */
export async function accountFetchList(payload) {
  return request(API.ACCOUNT.MGET, {
    method: 'POST',
    data: {
      ids: payload.ids,
    },
  })
}

/**
 * 删除账户信息
 * DELETE
 * @param payload: { accountId }
 * @return request
 */
export async function accountDelete(payload) {
  const pattern = PathToRegexp.compile(API.ACCOUNT.CURD);
  return request(pattern({ aid: payload.accountId }), {
    method: 'DELETE',
  })
}

/**
 * 修改账户信息
 * POST
 * @param payload: { accountId }
 * @return request
 */
export async function accountEdit(payload) {
  const pattern = PathToRegexp.compile(API.ACCOUNT.CURD);
  return request(pattern({ aid: payload.accountId }), {
    method: 'PUT',
    data: {
      ...payload,
    },
  })
}
