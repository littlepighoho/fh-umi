import PathToRegexp from 'path-to-regexp';
import request from '@/utils/request';
import { API } from '@/constant/apis';

/**
 * 获取考勤列表
 * GET
 * @param payload: { schoolId, courseId, arrangementId }
 * @return payload:
 */
export async function attendanceGetList(payload) {
  const pattern = PathToRegexp.compile(API.ATTENDANCE.LIST);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    aid: payload.arrangementId,
  }), {
    method: 'GET',
    params: payload.params,
  })
}

/**
 * 批量获取考勤信息
 * POST
 * @param payload: { schoolId, courseId, arrangementId, ids }
 * @return request
 */
export async function attendanceFetchList(payload) {
  const pattern = PathToRegexp.compile(API.ATTENDANCE.MGET);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    aid: payload.arrangementId,
  }), {
    method: 'POST',
    data: {
      ids: payload.ids,
    },
  })
}

/**
 * 获取考勤信息
 * GET
 * @param payload: { schoolId, courseId, arrangementId, attendanceId }
 * @retrun request
 */
export async function attendanceGetEntity(payload) {
  const pattern = PathToRegexp.compile(API.ATTENDANCE.CURD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    aid: payload.arrangementId,
    atid: payload.attendanceId,
  }), {
    method: 'GET',
  })
}

/**
 * 获取考勤信息
 * DELETE
 * @param payload: { schoolId, courseId, arrangementId, attendanceId }
 * @retrun request
 */
export async function attendanceDelete(payload) {
  const pattern = PathToRegexp.compile(API.ATTENDANCE.CURD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    aid: payload.arrangementId,
    atid: payload.attendanceId,
  }), {
    method: 'DELETE',
  })
}

/**
 * 修改考勤信息
 * PUT
 * @param payload: { schoolId, courseId, arrangementId, attendanceId }
 * @retrun request
 */
export async function attendanceEdit(payload) {
  const pattern = PathToRegexp.compile(API.ATTENDANCE.CURD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    aid: payload.arrangementId,
    atid: payload.attendanceId,
  }), {
    method: 'PUT',
    data: {
      leaver: payload.leaver,
      absent: payload.absent,
      late: payload.late,
    },
  })
}

/**
 * 批量导入考勤信息
 * POST
 * @param payload: { schoolId, courseId, arrangementId }
 * @retrun request
 */
export async function attendanceAdd(payload) {
  const pattern = PathToRegexp.compile(API.ATTENDANCE.ADD);
  return request(pattern({
    sid: payload.schoolId,
    cid: payload.courseId,
    aid: payload.arrangementId,
  }), {
    method: 'POST',
    data: {
      data: payload.data,
    },
  })
}
