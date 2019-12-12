import PathToRegexp from 'path-to-regexp';
import request from '@/utils/request';
import { API } from '@/constant/apis';


/**
 * 获取学校课程排课列表
 * GET
 * @param payload: { schoolId, courseId }
 * @return request
 */
export async function arrangementGetList(payload) {
  const pattern = PathToRegexp.compile(API.ARRANGEMENT.LIST);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId }), {
    method: 'GET',
    params: payload.params,
  })
}

/**
 * 批量获取学校课程的排课信息
 * POST
 * @param payload: { schoolId, courseId, ids }
 * @return request
 */
export async function arrangementFetchList(payload) {
  const pattern = PathToRegexp.compile(API.ARRANGEMENT.MGET);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId }), {
    method: 'POST',
    data: { ids: payload.ids },
  })
}

/**
 * 获取单个学校课程排课信息
 * GET
 * @param payload: { schoolId, courseId, arrangementId }
 * @return request
 */
export async function arrangementGetEntity(payload) {
  const pattern = PathToRegexp.compile(API.ARRANGEMENT.CURD);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId, aid: payload.arrangementId }), {
    method: 'GET',
  })
}

/**
 * 创建学校课程排课
 * POST
 * @param payload: { schoolId, courseId }
 * @return request
 */
export async function arrangementAdd(payload) {
  const pattern = PathToRegexp.compile(API.ARRANGEMENT.ADD);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId }), {
    method: 'POST',
    data: {
      name: payload.name,
      day_of_week: payload.day_of_week,
      start_week: payload.start_week,
      end_week: payload.end_week,
      odd_even: payload.odd_even,
      start_section: payload.start_section,
      end_section: payload.end_section,
      start_time: payload.start_time,
      end_time: payload.end_time,
    },
  })
}

/**
 * 修改学校课程信息
 * PUT
 * @param payload: { schoolId, courseId, arrangementId }
 * @return request
 */
export async function arrangementEdit(payload) {
  const pattern = PathToRegexp.compile(API.ARRANGEMENT.CURD);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId, aid: payload.arrangementId }), {
    method: 'PUT',
    data: {
      name: payload.name,
      day_of_week: payload.day_of_week,
      start_week: payload.start_week,
      end_week: payload.end_week,
      odd_even: payload.odd_even,
      start_section: payload.start_section,
      end_section: payload.end_section,
      start_time: payload.start_time,
      end_time: payload.end_time,
    },
  })
}

/**
 * 删除学校课程
 * DELETE
 * @param payload: { schoolId, courseId, arrangementId }
 * @return request
 */
export async function arrangementDel(payload) {
  const pattern = PathToRegexp.compile(API.ARRANGEMENT.CURD);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId, aid: payload.arrangementId }), {
    method: 'DELETE',
  })
}

/**
 * 获取排课内学生信息
 * GET
 * @param payload: { schoolId, courseId, arrangementId }
 * @return request
 */
export async function arrangementGetStudentList(payload) {
  const pattern = PathToRegexp.compile(API.ARRANGEMENT.STUDENT);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId, aid: payload.arrangementId }), {
    method: 'GET',
  })
}

/**
 * 排课批量移除学生
 * DELETE
 * @param payload: { schoolId, courseId, arrangementId, ids}
 * @return request
 */
export async function arrangementDeleteStudent(payload) {
  const pattern = PathToRegexp.compile(API.ARRANGEMENT.STUDENT);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId, aid: payload.arrangementId }), {
    method: 'DELETE',
    data: {
      ids: payload.ids,
    },
  })
}

/**
 * 排课批量学生信息导入
 * POST
 * @param payload: { schoolId, courseId, arrangementId, data}
 * @return request
 */
export async function arrangementAddStudent(payload) {
  const pattern = PathToRegexp.compile(API.ARRANGEMENT.STUDENT);
  return request(pattern({ sid: payload.schoolId, cid: payload.courseId, aid: payload.arrangementId }), {
    method: 'POST',
    data: {
      data: payload.data,
    },
  })
}

