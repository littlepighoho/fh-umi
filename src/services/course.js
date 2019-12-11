import PathToRegexp from 'path-to-regexp';
import request from '@/utils/request';
import { API } from '@/constant/apis';


/**
 * 获取学校课程列表
 * GET
 * @param payload: { schoolId }
 * @return request
 */
export async function courseGetList(payload) {
  const pattern = PathToRegexp.compile(API.COURSE.LIST);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'GET',
    params: payload.params,
  })
}

/**
 * 批量获取学校课程信息
 * POST
 * @param payload: { schoolId, ids }
 * @return request
 */
export async function courseFetchList(payload) {
  const pattern = PathToRegexp.compile(API.COURSE.MGET);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'POST',
    data: { ids: payload.ids },
  })
}

/**
 * 获取单个学校课程信息
 * GET
 * @param payload: { schoolId, courseId }
 * @return request
 */
export async function courseGetEntity(payload) {
  const pattern = PathToRegexp.compile(API.COURSE.CURD);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId }), {
    method: 'GET',
  })
}

/**
 * 创建学校课程
 * POST
 * @param payload: { schoolId }
 * @return request
 */
export async function courseAdd(payload) {
  const pattern = PathToRegexp.compile(API.COURSE.ADD);
  return request(pattern({ sid: payload.schoolId }), {
    method: 'POST',
    data: {
      name: payload.name,
      description: payload.description,
      tag: payload.tag,
      start_time: payload.start_time,
      end_time: payload.end_time,
    },
  })
}

/**
 * 修改学校课程信息
 * PUT
 * @param payload: { schoolId, courseId }
 * @return request
 */
export async function courseEdit(payload) {
  const pattern = PathToRegexp.compile(API.COURSE.CURD);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId }), {
    method: 'PUT',
    data: {
      name: payload.name,
      description: payload.description,
      tag: payload.tag,
      start_time: payload.start_time,
      end_time: payload.end_time,
    },
  })
}

/**
 * 删除学校课程
 * DELETE
 * @param payload: { schoolId, courseId }
 * @return request
 */
export async function courseDel(payload) {
  const pattern = PathToRegexp.compile(API.COURSE.CURD);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId }), {
    method: 'DELETE',
  })
}

