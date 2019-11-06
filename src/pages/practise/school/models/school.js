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
                    type:'getList',
                    payload:{
                        name:data.name,
                        description:data.description,
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
                    type:'getList',
                    payload:{
                        name:result.name,
                        description:result.description,
                    }
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
                    type:'saveState',
                    payload:false
                })
            }
            catch(e){
            }
        },
        *fetchSchoolEntities({ payload }, { call, put, all}) {
            try {
                console.log("fet",payload);
                const result = yield call(schoolService.fetchSchoolEntities, payload);
                yield put({
                    type: 'saveState',
                    payload: {
                        keyName: 'entities',
                        data: result.data,
                        ids: payload.ids,
                    }
                })

            } catch(e) {
                console.log(e);
            }
        },
        * deleteSchool({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.deleteSchool,payload);
                const {data} = result;
                yield put({
                    type:'getList',
                    payload:{},
                })
            }
            catch(e){

            }
        },
        * getList({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.getList,payload);
                const {data} = result;
                const ids = data.schools.map((item) => item.id);
                yield put({
                    type: 'fetchSchoolEntities',
                    payload: {
                        ids,
                        limit:payload.pageSize,
                        page:payload.page,
                        name:payload.name,
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
                console.log(e);
            }
        },

    },
    reducers :{
        saveSchool(state,{payload}){
            return {...state,schools:payload};
        },
        savePagination(state,{payload}){
            return {...state,[payload.keyName]:payload.data};
        },
        saveState(state, { payload }) {
            return { ...state, [payload.keyName]: payload.data };
        }
    }
}