import * as schoolService from '../services/school';
import {message} from 'antd';
import { effects } from 'redux-saga';

export default {
    namespace:'school',
    state:{
        list: {
            schools: [],
            pagination: {},
        },
        entities: [],
        setities:[],
    },

    effects:{
        * setSchool({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.setSchool,payload);
                const {data} = result;
                yield put({
                    type:'saveState',
                    payload:{
                        keyName:'setities',
                        data:result.data,
                    }
                })
            }
            catch(e){

            }
        },

        * editSchool({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.editSchool,payload);
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
        * getSchool({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.getSchool, payload);
                const {data} = result;
                yield put({
                    type:'saveList',
                    payload:false
                })
            }
            catch(e){
            }
        },
        *fetchSchoolEntities({ payload }, { call, put, all}) {
            try {
                const result = yield call(schoolService.fetchSchoolEntities, payload);
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
        * deleteSchool({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.editSchool,payload);
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
        saveSchool(state,{payload}){
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