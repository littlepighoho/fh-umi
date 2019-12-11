import { message } from 'antd';
import get from 'lodash/get';
import {
  courseGetList,
  courseFetchList,
  courseGetEntity,
  courseAdd,
  courseDel,
  courseEdit,
} from '@/services/course';

import { DVAKEYS } from '@/constant/dvaKeys';

const Model = {
  namespace: DVAKEYS.COURSE.ROOT,

  state: {
    courseList: {
      courses: [],
      pagination: {},
    },
    courseEntities: [],
    courseEntity: {},
    chooseSchool: false,
  },
  effects: {
    // 获取课程列表
    *getCourseList({ payload }, { call, put }) {
      try {
        const response = yield call(courseGetList, payload);
        const { data } = response;
        const { courses, pagination } = data;
        yield put({
          type: 'saveCourseList',
          payload: {
            courses,
            pagination,
          },
        });
        const ids = courses.map(item => item.id);
        yield put({
          type: 'fetchCourseList',
          payload: {
            ids,
            schoolId: payload.schoolId,
          },
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 批量获取课程信息
    *fetchCourseList({ payload }, { call, put }) {
      try {
        const response = yield call(courseFetchList, payload);
        const { data } = response;
        yield put({
          type: 'saveCourseEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 获取课程信息
    *getCourseEntity({ payload }, { call, put }) {
      try {
        const response = yield call(courseGetEntity, payload);
        const { data } = response;
        yield put({
          type: 'saveCourseEntity',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 创建课程
    *addCourse({ payload }, { call }) {
      try {
        const response = yield call(courseAdd, payload);
        const { data } = response;
        if (get(data, 'id', null)) {
          message.success('创建成功')
        } else {
          message.error('创建失败')
        }
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 删除课程
    *deleteCourse({ payload }, { call }) {
      try {
        const response = yield call(courseDel, payload);
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
    // 修改课程
    *editCourse({ payload }, { call }) {
      try {
        const response = yield call(courseEdit, payload);
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
    // 清空课程状态
    *initCourseList(_, { put }) {
      try {
        yield put({
          type: 'saveInitCourseList',
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
  },
  reducers: {
    saveCourseList(state, { payload }) {
      return {
        ...state,
        chooseSchool: true,
        courseList: payload,
      }
    },
    saveCourseEntities(state, { payload }) {
      return {
        ...state,
        chooseSchool: true,
        courseEntities: payload,
      }
    },
    saveCourseEntity(state, { payload }) {
      return {
        ...state,
        courseEntity: payload,
      }
    },
    saveInitCourseList(state, _) {
      return {
        ...state,
        courseList: {
          courses: [],
          pagination: {},
        },
        courseEntities: [],
        chooseSchool: false,
      }
    },
  },
};
export default Model;
