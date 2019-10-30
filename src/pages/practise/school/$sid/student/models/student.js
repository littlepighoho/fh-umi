import * as studentService from '../services/student';
import {message} from 'antd';
import { effects } from 'redux-saga';

export default {
    namespace:'studentusers',
    state:{
        list: {
            studentusers: [],
            pagination: {},
        },
        entities: [],
        sid:-1,
    },

    effects:{
        * setStudent({payload}  , {call,put,all}){
            // console.log("payload",payload);
            try{
                // for
                const result = yield call(studentService.setStudent,payload);
                const {data} = result;
                yield put({
                    type:'getList',
                    payload:{
                        realname :data.realname,
                        code:data.code,
                        phone:data.phone,
                        schoolId :data.schoolId
                    }
                })
                if(data){
                    // message.success('注册成功');
                }
            }
            catch(e){
                console.log(e);
            }
        },

        * editStudent({payload}  , {call,put,all}){
            try{
                const result = yield call(studentService.editStudent,payload);
                const {data} = result;
                yield put({
                    type:'getList',
                    payload:{
                        realname :result.realname,
                        code:result.code,
                        phone:result.phone,
                        schoolId :result.schoolId
                    }
                })
                if(data){
                    message.success('修改成功');
                }
            }
            catch(e){
                console.log(e);
            }
        },
        * getStudent({payload}  , {call,put,all}){
            try{
                const result = yield call(studentService.getStudent, payload);
                const {data} = result;
                yield put({
                    type:'saveState',
                    payload:{
                        schoolId :result.schoolId
                    },

                })
            }
            catch(e){
            }
        },
        *fetchStudentEntities({ payload }, { call, put, all}) {
            try {
                const result = yield call(studentService.fetchStudentEntities, payload);
                yield put({
                    type: 'saveState',
                    payload: {
                        keyName: 'entities',
                        data: result.data,
                        schoolId :payload.schoolId,
                    }
                })

            } catch(e) {
                console.log(e);
            }
        },
        * deleteStudent({payload}  , {call,put,all}){
            try{
                const result = yield call(studentService.deleteStudent,payload);
                // const {data} = result;
                yield put({
                    type:'getList',
                    payload:{},
                })
            }
            catch(e){
                console.log("qwqwqwqw", e)
            }
        },
        * getList({payload}  , {call,put,all}){
            try{
                const result = yield call(studentService.getList,payload);
                const {data} = result;
                const ids = data.studentusers.map((item) => item.id);
                yield put({
                    type: 'fetchStudentEntities',
                    payload: {
                        ids,
                        schoolId :payload.schoolId,
                        limit:payload.pageSize,
                        page:payload.page,
                        key:payload.key,
                    }
                })
                yield put({
                    type:'savePagination',
                    payload:{
                        keyName:'pagination',
                        data:result.data.pagination,
                    }
                })
            }
            catch(e){
            }
        },
    },
    reducers :{
        saveState(state, { payload }) {
            return { ...state, [payload.keyName]: payload.data };
        },
        saveId(state, { payload }) {
            return { ...state, [payload.keyName]: payload.data };
        },
        savePagination(state,{payload}){
            return {...state,[payload.keyName]:payload.data};
        },
    }
}

