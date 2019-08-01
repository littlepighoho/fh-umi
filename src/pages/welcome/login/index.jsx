import React from 'react';
import Login from '../../../components/account/auth/login';
import './login.scss'
import { connect } from 'dva';
import router from 'umi/router';
const mapStateToProps = (state) => {
  return {
    auth: state.global.auth,
  }
};

@connect(mapStateToProps)
class LoginView extends React.PureComponent{
  doLogin = (payload) => {
    this.props.dispatch({
      type: 'global/login',
      payload: {
        username: payload.username,
        password: payload.password
      }
    }).then(() => {
      if(this.props.auth.logined) {
        router.push('')
      }
    })
  };
  render(){
    return (
      <div className="login_view">
        <div className="login_pad">
          <Login doLogin={this.doLogin}/>
        </div>
      </div>
    )
  }
}
export default LoginView;
