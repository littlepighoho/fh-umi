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
            try{
                const result = yield call(studentService.setStudent,payload);
                const {data} = result;
                yield put({
                    type:'saveList',
                    payload:{
                        // schoolId :data.schoolId
                    }
                })
                if(data){
                    message.success('注册成功');
                }
            }
            catch(e){

            }
        },

        * editStudent({payload}  , {call,put,all}){
            try{
                const result = yield call(studentService.editStudent,payload);
                const {data} = result;
                yield put({
                    type:'saveList',
                    payload:false
                })
                if(data){
                    message.success('修改成功');
                }
            }
            catch(e){

            }
        },
        * getStudent({payload}  , {call,put,all}){
            try{
                const result = yield call(studentService.getStudent, payload);
                const {data} = result;
                yield put({
                    type:'saveState',
                    payload:false,

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
                        // schoolId :result.schoolId,
                    }
                })

            } catch(e) {
                console.log(e);
            }
        },
        * deleteStudent({payload}  , {call,put,all}){
            try{
                const result = yield call(studentService.editStudent,payload);
                const {data} = result;
                yield put({
                    type:'saveList',
                    payload:false,
                })
            }
            catch(e){

            }
        },
        * getList({payload}  , {call,put,all}){
            try{
                // console.log(payload)
                const result = yield call(studentService.getList,payload);
                const {data} = result;
                console.log(data);
                const ids = data.studentusers.map((item) => item.id);
                console.log(ids)
                yield put({
                    type: 'fetchStudentEntities',
                    payload: {
                        ids,
                        // schoolId :data.schoolId
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
        }
    }
}

