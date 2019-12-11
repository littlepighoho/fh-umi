import request from '@/utils/request';
import { API } from '@/constant/apis';
import PathToRegexp from 'path-to-regexp';

/**
 * 获取学生列表
 * GET
 * @param payload: { params, schoolId }
 * @return request
 * */
export async function studentGetList(payload) {
  const pattern = PathToRegexp.compile(API.STUDENT.LIST);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'GET',
    params: payload.params,
  });
}

/**
 * 批量获取学生信息
 * POST
 * @param payload: { ids, schoolId }
 * @return request
 */
export async function studentFetchList(payload) {
  const pattern = PathToRegexp.compile(API.STUDENT.MGET);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'POST',
    data: { ids: payload.ids },
  })
}

/**
 * 获取单个学生信息
 * GET
 * @param payload: { schoolId, studentId}
 * @return request
 */
export async function studentGetEntity(payload) {
  const pattern = PathToRegexp.compile(API.STUDENT.CURD);
  return request(pattern({ sid: payload.schoolId, stid: payload.studentId }), {
    method: 'GET',
  })
}

/**
 * 创建学生
 * POST
 * @param payload: {}
 * @return request
 */
export async function studentAdd(payload) {
  const pattern = PathToRegexp.compile(API.STUDENT.ADD);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'POST',
    data: {
      code: payload.code,
      realname: payload.realname,
      phone: payload.phone,
    },
  })
}

/**
 * 删除学生
 * DELETE
 * @param payload: {}
 * @return request
 */
export async function studentDelete(payload) {
  const pattern = PathToRegexp.compile(API.STUDENT.CURD);
  return request(pattern({ sid: payload.schoolId, stid: payload.studentId }), {
    method: 'DELETE',
  })
}


/**
 * 修改学生信息
 * PUT
 * @param payload: {}
 * @return request
 */
export async function studentEdit(payload) {
  const pattern = PathToRegexp.compile(API.STUDENT.CURD);
  return request(pattern({ sid: payload.schoolId, stid: payload.studentId }), {
    method: 'PUT',
    data: {
      code: payload.code,
      realname: payload.realname,
      phone: payload.phone,
    },
  })
}
