import * as schoolService from '../services/school';
import {message} from 'antd';
import { effects } from 'redux-saga';

export default {
    namespace:'school',
    state:{
        me:null,
        auth:{

        }
    },

    effects:{
        * registerSchool({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.registerSchool,payload);
                const {data} = result;
                if(data){
                    message.success('注册成功');
                }
            }
            catch(e){

            }
        },

        * editSchool({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.editSchool,payload);
                const {data} = result;
                if(data){
                    message.success('修改成功');
                }
            }
            catch(e){

            }
        },
        * getSchool({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.editSchool,payload);
                const {data} = result;
                yield put({
                    type:'saveAuth',
                    payload:false,
                })
            }
            catch(e){

            }
        },
        * deleteSchool({payload}  , {call,put,all}){
            try{
                const result = yield call(schoolService.editSchool,payload);
                const {data} = result;
                yield put({
                    type:'saveAuth',
                    payload:false,
                })
            }
            catch(e){

            }
        },

    }
}