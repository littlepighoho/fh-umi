import PathToRegexp from 'path-to-regexp';
import request from '@/utils/request';
import { API } from '@/constant/apis';


/**
 * 获取课室列表
 * GET
 * @param payload: { schoolId }
 * @return request
 */
export async function classroomGetList(payload) {
  const pattern = PathToRegexp.compile(API.CLASSROOM.LIST);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'GET',
    params: payload.params,
  })
}

/**
 * 批量获取课室列表
 * POST
 * @param payload: { schoolId, ids }
 * @return request
 */
export async function classroomFetchList(payload) {
  const pattern = PathToRegexp.compile(API.CLASSROOM.MGET);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'POST',
    data: {
      ids: payload.ids,
    },
  })
}

/**
 * 获取单个课室信息
 * GET
 * @param payload: { schoolId, classroomId }
 * @return request
 */
export async function classroomGetEntity(payload) {
  const pattern = PathToRegexp.compile(API.CLASSROOM.CURD);
  return request(pattern({ sid: payload.schoolId, cid: payload.classroomId }), {
    method: 'GET',
  })
}

/**
 * 批量创建课室
 * POST
 * @param payload: { schoolId }
 * @return request
 */
export async function classroomAdd(payload) {
  const pattern = PathToRegexp.compile(API.CLASSROOM.ADD);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'POST',
    data: {
      data: payload.data,
    },
  })
}

/**
 * 修改课室信息
 * PUT
 * @param payload: { schoolId, classroomId }
 * @return request
 */
export async function classroomEdit(payload) {
  const pattern = PathToRegexp.compile(API.CLASSROOM.CURD);
  return request(pattern({ sid: payload.schoolId, cid: payload.classroomId }), {
    method: 'PUT',
    data: {
      name: payload.name,
      size: payload.size,
    },
  })
}

/**
 * 删除课室
 * DELETE
 * @param payload: { schoolId, classroomId }
 * @return request
 */
export async function classroomDelete(payload) {
  const pattern = PathToRegexp.compile(API.CLASSROOM.CURD);
  return request(pattern({ sid: payload.schoolId, cid: payload.classroomId }), {
    method: 'DELETE',
  })
}

/**
 * 创建课室指派使用
 * POST
 * @param payload: { schoolId, classroomId }
 * @return request
 */
export async function classroomUserAdd(payload) {
  const pattern = PathToRegexp.compile(API.CLASSROOM.USER);
  return request(pattern({ sid: payload.schoolId, cid: payload.classroomId }), {
    method: 'POST',
    data: {
      arrangement: payload.arrangement,
    },
  })
}

/**
 * 删除课室指派使用
 * DELETE
 * @param payload: { schoolId, classroomId, userId }
 * @return request
 */
export async function classroomUserDelete(payload) {
  const pattern = PathToRegexp.compile(API.CLASSROOM.DELUSER);
  return request(pattern({ sid: payload.schoolId, cid: payload.classroomId, uid: payload.userId }), {
    method: 'DELETE',
  })
}

/**
 * 获取课室指派使用信息
 * GET
 * @param payload: { schoolId, classroomId }
 * @return request
 */
export async function classroomUserGetEntity(payload) {
  const pattern = PathToRegexp.compile(API.CLASSROOM.USER);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.classroomId
  }), {
    method: 'GET',
  })
}

