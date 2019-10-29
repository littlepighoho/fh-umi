import * as schoolService from '../services/student';
import {message} from 'antd';
import { effects } from 'redux-saga';

export default {
    namespace:'student',
    state:{
        list: {
            students: [],
            pagination: {},
        },
        entities: [],
    },

    effects:{
        * setStudent({payload}  , {call,put,all}){
            try{
                const result = yield call(studentService.setStudent,payload);
                const {data} = result;
                yield put({
                    type:'saveList',
                    payload:false
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
                const result = yield call(schoolService.editStudent,payload);
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
                const result = yield call(schoolService.getStudent, payload);
                const {data} = result;
                yield put({
                    type:'saveList',
                    payload:false
                })
            }
            catch(e){
            }
        },
        *fetchStudentEntities({ payload }, { call, put, all}) {
            try {
                const result = yield call(schoolService.fetchStudentEntities, payload);
                yield put({
                    type: 'saveState',
                    payload: {
                        keyName: 'entities',
                        data: result.data,
                    }
                })

            } catch(e) {
                console.log(e);
            }
        },
        * deleteStudent({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.editStudent,payload);
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
                console.log(payload)
                const result = yield call(schoolService.getList,payload);
                const {data} = result;
                console.log(data);
                // yield put({
                //     type:'saveState',
                //     payload: {
                //         keyName: 'list',
                //         data,
                //     }
                // })
                const ids = data.schools.map((item) => item.id);
                console.log(ids)
                yield put({
                    type: 'fetchSchoolEntities',
                    payload: {
                        ids,
                    }
                })
            }
            catch(e){
            }
        },

    },
    reducers :{
        saveStudent(state,{payload}){
            return {...state,schools:payload};
        },
        savePagination(state,{payload}){
            return {...state,pagination:payload};
        },
        saveState(state, { payload }) {
            return { ...state, [payload.keyName]: payload.data };
        }
    }
}