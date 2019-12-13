import { message } from 'antd';
import get from 'lodash/get';
import {
  evaluateGetStudentList,
  evaluateFetchStudentList,
  evaluateGetStudentEntity,
  evaluateAddStudent,
  evaluateDeleteStudent,
  evaluateGetCourseList,
  evaluateFetchCourseList,
  evaluateGetCourseEntity,
  evaluateAddCourse,
  evaluateDeleteCourse,
  evaluateGetTeacherList,
  evaluateFetchTeacherList,
  evaluateGetTeacherEntity,
  evaluateAddTeacher,
  evaluateDeleteTeacher,
} from '@/services/evaluate';

import { DVAKEYS } from '@/constant/dvaKeys';

const Model = {
  namespace: DVAKEYS.EVALUATE.ROOT,

  state: {
    evaluateList: {
      evaluates: [],
      pagination: {},
    },
    evaluateEntities: [],
    evaluateEntity: {},
  },
  effects: {
    // 获取学生对教师评价列表
    *getEvaluateStudentList({ payload }, { call, put }) {
      try {
        const response = yield call(evaluateGetStudentList, payload);
        const { data } = response;
        const { evaluates, pagination } = data;
        yield put({
          type: 'saveEvaluateList',
          payload: {
            evaluates,
            pagination,
          },
        });
        const ids = evaluates.map(item => item.id);
        yield put({
          type: 'fetchEvaluateStudentList',
          payload: {
            ids,
            schoolId: payload.schoolId,
            courseId: payload.courseId,
          },
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 批量获取学生对教师评价列表
    *fetchEvaluateStudentList({ payload }, { call, put }) {
      try {
        const response = yield call(evaluateFetchStudentList, payload);
        const { data } = response;
        yield put({
          type: 'saveEvaluateEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 获取学生对教师评价
    *getEvaluateStudentEntity({ payload }, { call, put }) {
      try {
        const response = yield call(evaluateGetStudentEntity, payload);
        const { data } = response;
        yield put({
          type: 'saveEvaluateEntity',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 导入学生对教师评价
    *addEvaluateStudent({ payload }, { call }) {
      try {
        const response = yield call(evaluateAddStudent, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('导入成功')
        } else {
          message.error('导入失败')
        }
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 删除学生对教师评价
    *deleteEvaluateStudent({ payload }, { call }) {
      try {
        const response = yield call(evaluateDeleteStudent, payload);
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

    // 获取学生对课程评价列表
    *getEvaluateCourseList({ payload }, { call, put }) {
      try {
        const response = yield call(evaluateGetCourseList, payload);
        const { data } = response;
        const { evaluates, pagination } = data;
        yield put({
          type: 'saveEvaluateList',
          payload: {
            evaluates,
            pagination,
          },
        });
        const ids = evaluates.map(item => item.id);
        yield put({
          type: 'fetchEvaluateCourseList',
          payload: {
            ids,
            schoolId: payload.schoolId,
            courseId: payload.courseId,
          },
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 批量获取学生对课程评价列表
    *fetchEvaluateCourseList({ payload }, { call, put }) {
      try {
        const response = yield call(evaluateFetchCourseList, payload);
        const { data } = response;
        yield put({
          type: 'saveEvaluateEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 获取学生对课程评价
    *getEvaluateCourseEntity({ payload }, { call, put }) {
      try {
        const response = yield call(evaluateGetCourseEntity, payload);
        const { data } = response;
        yield put({
          type: 'saveEvaluateEntity',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 导入学生对课程评价
    *addEvaluateCourse({ payload }, { call }) {
      try {
        const response = yield call(evaluateAddCourse, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('导入成功')
        } else {
          message.error('导入失败')
        }
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 删除学生对课程评价
    *deleteEvaluateCourse({ payload }, { call }) {
      try {
        const response = yield call(evaluateDeleteCourse, payload);
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
    // 获取教师对学生评价列表
    *getEvaluateTeacherList({ payload }, { call, put }) {
      try {
        const response = yield call(evaluateGetTeacherList, payload);
        const { data } = response;
        const { evaluates, pagination } = data;
        yield put({
          type: 'saveEvaluateList',
          payload: {
            evaluates,
            pagination,
          },
        });
        const ids = evaluates.map(item => item.id);
        yield put({
          type: 'fetchEvaluateTeacherList',
          payload: {
            ids,
            schoolId: payload.schoolId,
            courseId: payload.courseId,
          },
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 批量获取教师对学生评价列表
    *fetchEvaluateTeacherList({ payload }, { call, put }) {
      try {
        const response = yield call(evaluateFetchTeacherList, payload);
        const { data } = response;
        yield put({
          type: 'saveEvaluateEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 获取教师对学生评价
    *getEvaluateTeacherEntity({ payload }, { call, put }) {
      try {
        const response = yield call(evaluateGetTeacherEntity, payload);
        const { data } = response;
        yield put({
          type: 'saveEvaluateEntity',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 导入教师对学生评价
    *addEvaluateTeacher({ payload }, { call }) {
      try {
        const response = yield call(evaluateAddTeacher, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('导入成功')
        } else {
          message.error('导入失败')
        }
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 删除教师对学生评价
    *deleteEvaluateTeacher({ payload }, { call }) {
      try {
        const response = yield call(evaluateDeleteTeacher, payload);
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
  },
  reducers: {
    saveEvaluateList(state, { payload }) {
      return {
        ...state,
        evaluateList: payload,
      }
    },
    saveEvaluateEntities(state, { payload }) {
      return {
        ...state,
        evaluateEntities: payload,
      }
    },
    saveEvaluateEntity(state, { payload }) {
      return {
        ...state,
        evaluateEntity: payload,
      }
    },
  },
};
export default Model;
