import React from 'react';
import Login from '../../../components/account/auth/login';
import './login.scss'
import { connect } from 'dva';

const mapStateToProps = (state) => {
  console.log(state)
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
