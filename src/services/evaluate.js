import PathToRegexp from 'path-to-regexp';
import request from '@/utils/request';
import { API } from '@/constant/apis';
/**
 * 获取学生对教师评价列表
 * GET
 * @param payload: { schoolId, courseId }
 * @request request
 */

export async function evaluateGetStudentList(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.STUDENT.LIST);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
  }), {
    method: 'GET',
    params: payload.params,
  })
}

/**
 * 批量获取学生对教师评价
 * POST
 * @param payload: { schoolId, courseId, ids}
 * @request request
 */

export async function evaluateFetchStudentList(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.STUDENT.MGET);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
  }), {
    method: 'POST',
    data: {
      ids: payload.ids,
    },
  })
}

/**
 * 获取学生对教师评价
 * GET
 * @param payload: { schoolId, courseId, evaluateId }
 * @request request
 */

export async function evaluateGetStudentEntity(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.STUDENT.CURD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    eid: payload.evaluateId,
  }), {
    method: 'GET',
  })
}

/**
 * 删除学生对教师评价列表
 * DELETE
 * @param payload: { schoolId, courseId }
 * @request request
 */

export async function evaluateDeleteStudent(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.STUDENT.CURD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    eid: payload.evaluateId,

  }), {
    method: 'DELETE',
  })
}

/**
 * 导入学生对教师评价列表
 * POST
 * @param payload: { schoolId, courseId }
 * @request request
 */

export async function evaluateAddStudent(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.STUDENT.ADD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
  }), {
    method: 'PUT',
    data: {
      data: payload.data,
    },
  })
}

/**
 * 获取学生对课程评价列表
 * GET
 * @param payload: { schoolId, courseId }
 * @request request
 */

export async function evaluateGetCourseList(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.COURSE.LIST);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
  }), {
    method: 'GET',
    params: payload.params,
  })
}

/**
 * 批量获取学生对课程评价
 * POST
 * @param payload: { schoolId, courseId, ids}
 * @request request
 */

export async function evaluateFetchCourseList(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.COURSE.MGET);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
  }), {
    method: 'POST',
    data: {
      ids: payload.ids,
    },
  })
}

/**
 * 获取学生对课程评价
 * GET
 * @param payload: { schoolId, courseId, evaluateId }
 * @request request
 */

export async function evaluateGetCourseEntity(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.COURSE.CURD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    eid: payload.evaluateId,
  }), {
    method: 'GET',
  })
}

/**
 * 删除学生对课程评价列表
 * DELETE
 * @param payload: { schoolId, courseId }
 * @request request
 */

export async function evaluateDeleteCourse(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.COURSE.CURD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    eid: payload.evaluateId,

  }), {
    method: 'DELETE',
  })
}

/**
 * 导入学生对课程评价列表
 * POST
 * @param payload: { schoolId, courseId }
 * @request request
 */

export async function evaluateAddCourse(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.COURSE.ADD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
  }), {
    method: 'PUT',
    data: {
      data: payload.data,
    },
  })
}



/**
 * 获取教师对学生评价列表
 * GET
 * @param payload: { schoolId, courseId }
 * @request request
 */

export async function evaluateGetTeacherList(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.TEACHER.LIST);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
  }), {
    method: 'GET',
    params: payload.params,
  })
}

/**
 * 批量获取教师对学生评价
 * POST
 * @param payload: { schoolId, courseId, ids}
 * @request request
 */

export async function evaluateFetchTeacherList(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.TEACHER.MGET);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
  }), {
    method: 'POST',
    data: {
      ids: payload.ids,
    },
  })
}

/**
 * 获取教师对学生评价
 * GET
 * @param payload: { schoolId, courseId, evaluateId }
 * @request request
 */

export async function evaluateGetTeacherEntity(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.TEACHER.CURD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    eid: payload.evaluateId,
  }), {
    method: 'GET',
  })
}

/**
 * 删除教师对学生评价列表
 * DELETE
 * @param payload: { schoolId, courseId }
 * @request request
 */

export async function evaluateDeleteTeacher(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.TEACHER.CURD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    eid: payload.evaluateId,

  }), {
    method: 'DELETE',
  })
}

/**
 * 导入教师对学生评价列表
 * POST
 * @param payload: { schoolId, courseId }
 * @request request
 */

export async function evaluateAddTeacher(payload) {
  const pattern = PathToRegexp.compile(API.EVALUATE.TEACHER.ADD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
  }), {
    method: 'PUT',
    data: {
      data: payload.data,
    },
  })
}
