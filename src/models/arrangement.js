import { message } from 'antd';
import get from 'lodash/get';
import {
  arrangementGetList,
  arrangementFetchList,
  arrangementAdd,
  arrangementGetEntity,
  arrangementDel,
  arrangementEdit,
  arrangementGetStudentList,
  arrangementDeleteStudent,
  arrangementAddStudent,
} from '@/services/arrangement';

import { DVAKEYS } from '@/constant/dvaKeys';

const Model = {
  namespace: DVAKEYS.ARRANGEMENT.ROOT,

  state: {
    arrangementList: {
      arrangements: [],
      pagination: {},
    },
    arrangementEntities: [],
    arrangementEntity: {},
    studentEntities: [],
  },
  effects: {
    // 获取课程排课列表
    *getArrangementList({ payload }, { call, put }) {
      try {
        const response = yield call(arrangementGetList, payload);
        const { data } = response;
        const { arrangements, pagination } = data;
        yield put({
          type: 'saveArrangementList',
          payload: {
            arrangements,
            pagination,
          },
        });
        const ids = arrangements.map(item => item.id);
        yield put({
          type: 'fetchArrangementList',
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
    // 批量获取课程排课信息
    *fetchArrangementList({ payload }, { call, put }) {
      try {
        const response = yield call(arrangementFetchList, payload);
        const { data } = response;
        data.reverse();
        yield put({
          type: 'saveArrangementEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 获取课程排课信息
    *getArrangementEntity({ payload }, { call, put }) {
      try {
        const response = yield call(arrangementGetEntity, payload);
        const { data } = response;
        yield put({
          type: 'saveArrangementEntity',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 创建课程排课
    *addArrangement({ payload }, { call }) {
      try {
        const response = yield call(arrangementAdd, payload);
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
    // 删除课程排课
    *deleteArrangement({ payload }, { call }) {
      try {
        const response = yield call(arrangementDel, payload);
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
    // 修改课程排课
    *editArrangement({ payload }, { call }) {
      try {
        const response = yield call(arrangementEdit, payload);
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
    // 导入学生
    *addArrangementStudent({ payload }, { call }) {
      try {
        const response = yield call(arrangementAddStudent, payload);
        const { data } = response;
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 批量获取学生信息
    *getArrangementStudentList({ payload }, { call, put }) {
      try {
        const response = yield call(arrangementGetStudentList, payload);
        const { data } = response;
        yield put({
          type: 'saveStudentEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 删除学生信息
    *deleteArrangementStudent({ payload }, { call }) {
      try {
        const response = yield call(arrangementDeleteStudent, payload);
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
    saveArrangementList(state, { payload }) {
      return {
        ...state,
        arrangementList: payload,
      }
    },
    saveArrangementEntities(state, { payload }) {
      return {
        ...state,
        arrangementEntities: payload,
      }
    },
    saveArrangementEntity(state, { payload }) {
      return {
        ...state,
        arrangementEntity: payload,
      }
    },
    saveStudentEntities(state, { payload }) {
      return {
        ...state,
        studentEntities: payload,
      }
    },
  },
};
export default Model;
