import request from '@/utils/request';
import { API } from '@/constant/apis';
import PathToRegexp from 'path-to-regexp';

/**
 * 获取学校列表
 * GET
 * @param payload: { params }
 * @return request
 * */
export async function schoolGetList(payload) {
  return request(API.SCHOOL.LIST, {
    method: 'GET',
    params: payload.params,
  });
}

/**
 * 批量获取学校信息
 * POST
 * @param payload: { ids }
 * @return request
 */
export async function schoolFetchList(payload) {
  return request(API.SCHOOL.MGET, {
    method: 'POST',
    data: {
      ids: payload.ids,
    },
  })
}


/**
 * 获取学校详细信息
 * POST
 * @param payload: { schoolID }
 * @return request
 */
export async function schoolGetEntity(payload) {
  const pattern = PathToRegexp.compile(API.SCHOOL.CURD);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'GET',
  })
}

/**
 * 新增学校
 * POST
 * @patam payload: {}
 * @return request
 */
export async function schoolAdd(payload) {
  return request(API.SCHOOL.ADD, {
    method: 'POST',
    data: {
      name: payload.name,
      description: payload.description,
    },
  })
}

/**
 * 删除学校
 * DELETE
 * @patam payload: { schoolId }
 * @return request
 */
export async function schoolDelete(payload) {
  const pattern = PathToRegexp.compile(API.SCHOOL.CURD);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'DELETE',
  })
}

/**
 * 修改学校信息
 * PUT
 * @patam payload: { schoolId }
 * @return request
 */
export async function schoolEdit(payload) {
  const pattern = PathToRegexp.compile(API.SCHOOL.CURD);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'PUT',
    data: {
      name: payload.name,
      description: payload.description,
    },
  })
}


