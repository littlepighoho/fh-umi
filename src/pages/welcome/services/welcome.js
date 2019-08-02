import React ,{Component,Fragment}from 'react';
import Login from '../../../components/account/auth/login';
import Top from '../../../components/account/auth/top';
import './login.scss';
import { connect } from 'dva';

class Weclome extends Component{
    render(){
      return(
        <Fragment>
          <Top/>
          <div className="typeface">
            HELLO,
          </div>
        </Fragment>

      )

    }

}

export default  Weclome;
