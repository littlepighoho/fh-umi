import { routerRedux } from 'dva/router';
import { message } from 'antd';
import get from 'lodash/get';
import {
  schoolGetList,
  schoolFetchList,
  schoolGetEntity,
  schoolAdd,
  schoolDelete,
  schoolEdit,
} from '@/services/school';

import { DVAKEYS } from '@/constant/dvaKeys';

const Model = {
  namespace: DVAKEYS.SCHOOL.ROOT,

  state: {
    schoolList: {
      schools: [],
      pagination: {},
    },
    schoolEntities: [],
    schoolEntity: {},
  },
  effects: {
    // 获取学校列表
    *getSchoolList({ payload }, { call, put }) {
      try {
        const response = yield call(schoolGetList, payload);
        const { data } = response;
        const { schools, pagination } = data;
        yield put({
          type: 'saveSchoolList',
          payload: {
            schools,
            pagination,
          },
        });
        const ids = schools.map(item => item.id);
        yield put({
          type: 'fetchSchoolList',
          payload: {
            ids,
          },
        })
      } catch (e) {
        message.error(e.toString())
      }
    },
    // 批量获取学校信息
    *fetchSchoolList({ payload }, { call, put }) {
      try {
        const response = yield call(schoolFetchList, payload);
        const { data } = response;
        yield put({
          type: 'saveSchoolEntities',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 获取学校信息
    *getSchoolEntity({ payload }, { call, put }) {
      try {
        const response = yield call(schoolGetEntity, payload);
        const { data } = response;
        yield put({
          type: 'saveSchoolEntity',
          payload: data,
        })
      } catch (e) {
        message.error(e.toString());
      }
    },
    // 创建学校
    *addSchool({ payload }, { call }) {
      try {
        const response = yield call(schoolAdd, payload);
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
    // 删除学校
    *deleteSchool({ payload }, { call }) {
      try {
        const response = yield call(schoolDelete, payload);
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
    // 修改学校
    *editSchool({ payload }, { call }) {
      try {
        const response = yield call(schoolEdit, payload);
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
  },
  reducers: {
    saveSchoolList(state, { payload }) {
      return {
        ...state,
        schoolList: payload,
      }
    },
    saveSchoolEntities(state, { payload }) {
      return {
        ...state,
        schoolEntities: payload,
      }
    },
    saveSchoolEntity(state, { payload }) {
      return {
        ...state,
        schoolEntity: payload,
      }
    },

  }
};
export default Model;
